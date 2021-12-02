import React, {Component} from 'react'
 
import SeatPicker from 'react-seat-picker'
 
export default class Pickseat  extends Component {
  state = {
    loading: false
  }
 
  addSeatCallbackContinousCase = ({ row, number, id }, addCb, params, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      if (removeCb) {
        await new Promise(resolve => setTimeout(resolve, 750))
        console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
        removeCb(params.row, params.number)
      }
      await new Promise(resolve => setTimeout(resolve, 750))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `Seat-${id}`
      addCb(row, number, id, newTooltip)
      this.props.updatePrice(500, number, row, id)
      this.setState({ loading: false })
    })
  }
 
  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 750))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      this.props.updatePrice(-500)
      this.setState({ loading: false })
    })
  }
 
  render() {
    const rows = [
      [{id: 1, number: 1, isSelected: false}, {id: 2, number: 2, isSelected: false,}, null, {id: 3, number: '3', isReserved: false, orientation: 'east'}, {id: 4, number: '4', orientation: 'west'}, null, {id: 5, number: 5}, {id: 6, number: 6}],
      [{id: 7, number: 1, isReserved: true}, {id: 8, number: 2,}, null, {id: 9, number: '3', orientation: 'east'}, {id: 10, number: '4', orientation: 'west'}, null, {id: 11, number: 5}, {id: 12, number: 6}],
      [{id: 13, number: 1}, {id: 14, number: 2}, null, {id: 15, number: 3, isReserved: true, orientation: 'east'}, {id: 16, number: '4', orientation: 'west'}, null, {id: 17, number: 5}, {id: 18, number: 6}],
      [{id: 19, number: 1}, {id: 20, number: 2}, null, {id: 21, number: 3, orientation: 'east'}, {id: 22, number: '4', orientation: 'west'}, null, {id: 23, number: 5}, {id: 24, number: 6}],
      [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {id: 27, number: '3', isReserved: true}, {id: 28, number: '4', orientation: 'west'}, null,{id: 29, number: 5}, {id: 30, number: 6}]
    ]
    const {loading} = this.state
    return (
      <>
        <div className="card">
        <div style={{ marginTop: '100px' }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallbackContinousCase}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
            continuous
          />
        </div>
      </div>
      </>
    )
  }
}