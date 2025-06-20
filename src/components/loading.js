import React, { Component } from 'react'
import Spinnerr from './Spinner.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3"  src={Spinnerr} alt="loading" />
      </div>
    )
  }
}
