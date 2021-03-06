import React from 'react';
import {OptionsPanel} from './OptionsPanel';
import {TableRow} from './TableRow';
import {TableRowsSet} from './TableRowSet';
import Scrollable from '../../src/Scrollable';
import '../main.less';
import {Card} from '../card';
import pick from 'lodash.pick';

function calculateAbsoluteTopOffset(elem) {
    let offsetTop = elem.offsetTop;

    while(elem.offsetParent != null) {
        elem = elem.offsetParent;
        offsetTop += elem.offsetTop;
    }

    return offsetTop;
}

export class App extends React.Component {
    constructor(...args) {
        super(...args);

        const {rows} = this.props;

        this.state = {
            options: {
                minSize: 1000,
                maxSize: rows.size,
                isBodyScroll: true,
                size: 1000,
                row: 0,
                buffer: 1,
                minBuffer: 1,
                maxBuffer: 10,
                unequalRowsHeight: false,
                rowHeight: 40,
                className: 'fixedTable'
            }
        };
    }

    componentDidMount() {
        const tableStartOffset = calculateAbsoluteTopOffset(document.getElementById('table'));
        this.setState({
            options: {...this.state.options, tableStartOffset}
        });
    }

    _rowHeight(index) {
        return this.props.rows.get(index).get('height');
    }

    onOptionsChange(options) {
        const {unequalRowsHeight, isBodyScroll} = options;

        options.rowHeight = unequalRowsHeight ? this._rowHeight.bind(this) : 40;
        options.className = isBodyScroll ? '' : 'containerScroll';

        if (this.state.options.row !== options.row) {
            this.refs.scrollable.scrollToRow(options.row);
        }

        this.setState({options});
    }

    render() {
        const {rows} = this.props;
        const options = pick(this.state.options,
            ['isBodyScroll', 'size', 'buffer', 'tableStartOffset', 'rowHeight', 'className']);
        return <div>
            <h1>React Table</h1>
            <div id="controls">
                <OptionsPanel options={this.state.options} onChange={this.onOptionsChange.bind(this)}/>
            </div>
            <div id="table">
                <Scrollable {...options} ref="scrollable" >
                    <TableRowsSet rows={rows} fixedHeight={!this.state.options.unequalRowsHeight}/>
                </Scrollable>
            </div>
        </div>;
    }
}