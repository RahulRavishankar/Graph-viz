//Component to display the labels of colors used during visualization
import React, { Component } from 'react'

class LabelBox extends Component {
	render() {
		return (
			<div style={{display:"inline-block", width:"15%" }}>
				<div style={{
					width: "20px",	
					height: "20px",
					display: "inline-block",
					border:"1px solid", 
					backgroundColor: this.props.color}} 
				/>
				{' '}{this.props.title}
			</div>
			
		)
	}
}
class Label extends Component {
	render() {
		return (
			<div style={containerStyle} >
				<LabelBox color="#ff0000" title="Start" />
				<LabelBox color="#008000" title="End" />
				<LabelBox color="#000000" title="Wall" />
				<LabelBox color="#ffffff" title="Empty" />
				<LabelBox color="#ffA500" title="Visited" />
				<LabelBox color="#0000ff" title="Path" />
			</div>
		)
	}
}

const containerStyle = {
	marginTop: "1.5%",
	marginLeft: "20%",
	marginRight: "5%",
	display: "block"
}
export default Label
