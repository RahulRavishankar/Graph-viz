// Header Component of the app
import React, { Component } from 'react'

class Header extends Component {
	render() {
		return (
			<div>
				<h1 style={headerStyle} > Graph-viz </h1>
			</div>
		)
	}
}

const headerStyle = {
	backgroundColor: "#3360FF",   //"#8733FF",
	textAlign : "center",
	color: "#ffffff",
}
export default Header
