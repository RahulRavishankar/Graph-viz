import React, { Component } from 'react'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import '../css/NavBar.css'

class NavBar extends Component {
	render() {
		return (
			<div style={navbarstyle}>
				<AlgorithmDropdown />{' '}
				<SpeedDropdown /> {' '}
				<Button style={btnStyle} >Clear</Button>{' '}
				<Button style={btnStyle} >Start</Button>{' '}
			</div>
		)
	}
}
class AlgorithmDropdown extends Component {
	render() {
		return (
			<DropdownButton id="dropdown-basic-button" title="Algorithm">
				<Dropdown.Item href="#/action-1">A*</Dropdown.Item>
				<Dropdown.Item href="#/action-2">Djikstra's</Dropdown.Item>
				<Dropdown.Item href="#/action-3">BFS</Dropdown.Item>
				<Dropdown.Item href="#/action-3">DFS</Dropdown.Item>
				<Dropdown.Item href="#/action-3">Greedy Best-First-Search</Dropdown.Item>
			</DropdownButton>
		)
	}
}
class SpeedDropdown extends Component {
	render() {
		return (
			<DropdownButton id="dropdown-basic-button" title="Speed" style={dropDownStyle}>
				<Dropdown.Item href="#/action-1">Slow</Dropdown.Item>
				<Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
				<Dropdown.Item href="#/action-3">Fast</Dropdown.Item>
			</DropdownButton>
		)
	}
}

const navbarstyle = {
	width: '100%',
	position: 'relative',
	display: 'inline-block',
	paddingLeft: '5%',
	paddingRight: '5%'
}

const btnStyle = {
	float: 'right',
	display: 'inline-block',
	position: 'relative',
	borderRadius: '25%',
	paddingLeft: '10px',
	paddingRight: '10px',
	marginLeft: '10px',
	marginRight: '10px'
}

const dropDownStyle = { 
	paddingLeft: '10px'
}

export default NavBar
