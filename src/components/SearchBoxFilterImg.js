import _ from 'lodash'
import { products } from '../products'
import React, { Component } from 'react'
import Search from '@bit/semantic-org.semantic-ui-react.search'
import Grid from '@bit/semantic-org.semantic-ui-react.grid'
import './SearchBoxFilterImg';
const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

const source = products;

class SearchBoxFilterImg extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }


    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid>
                <Grid.Column width={6}>
                      <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={results}
                        value={value}
                        {...this.props}
                      />
                </Grid.Column>
            </Grid>
        )
    }
}

export default () => (<div style={{position: 'absolute', zIndex: 100}}>{style}<SearchBoxFilterImg className="backGroundTemp" style={{right: '0', top: '15px', position: 'fixed', display: "block"}} /></div>)