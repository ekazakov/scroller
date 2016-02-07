import React, { Component } from 'react';
//import _ from 'lodash';
import debounce from 'lodash.debounce';
import delay from 'lodash.delay';

export const BODY_SCROLL = "BODY_SCROLL";
export const CONTAINER_SCROLL = "CONTAINER_SCROLL";
function noop() {}
export class OptionsPanel extends Component {
    static defaultProps = {
        onScrollTypeChange: noop,
        onDataSizeChange: noop,
        onInfinityScrollChange: noop
    };

    constructor(...args) {
        super(...args);

        this.state = {
            size: this.props.size,
            scrollType: this.props.scrollType,
            infinityScroll: this.props.infinityScroll
        };

        this._onDataSizeChange = debounce(this.props.onDataSizeChange, 300);
    }

    onInfinityScrollChange(e) {
        const onRender = () =>
            delay(() => this.props.onInfinityScrollChange(e.target.checked), 100);
        this.setState({infinityScroll: e.target.checked}, onRender);
    }

    onScrollTypeChange(e) {
        const onRender = () =>
            delay(() => this.props.onScrollTypeChange(e.target.value), 100);
        this.setState({scrollType: e.target.value}, onRender);
    }

    onDataSizeChange(e) {
        const onRender = () => this._onDataSizeChange(e.target.value);
        this.setState({size: e.target.value}, onRender);
    }

    render() {
        return <div className="controlsPanel">
            <h4>Scroll type</h4>
            <div>
                <label>
                    <input type="radio"
                           name="type"
                           value={BODY_SCROLL}
                           checked={BODY_SCROLL === this.state.scrollType}
                           onChange={this.onScrollTypeChange.bind(this)} /> body
                </label>
            </div>
            <div>
                <label>
                    <input type="radio"
                           name="type"
                           value={CONTAINER_SCROLL}
                           checked={CONTAINER_SCROLL === this.state.scrollType}
                           onChange={this.onScrollTypeChange.bind(this)}/> container
                </label>
            </div>

            <div style={{marginTop: 10}}>
                <label>
                    <input type="checkbox"
                           onChange={this.onInfinityScrollChange.bind(this)}
                           checked={this.state.infinityScroll}/> infinity scroll
                </label>
            </div>

            <h4>Data size</h4>
            <div>
                {this.props.minSize/1000}k
                <input type="range"
                       className="dataSizeRange"
                       min={this.props.minSize}
                       max={this.props.maxSize}
                       step="1000"
                       value={this.state.size}
                       onChange={this.onDataSizeChange.bind(this)}/>
                {this.props.maxSize/1000}k
            </div>

            <div style={{marginTop: 10}}>
                size: {this.state.size / 1000}k
            </div>
        </div>;
    }


}
