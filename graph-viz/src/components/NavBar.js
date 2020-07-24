import React, { Component } from 'react'
import {Button, Navbar, NavDropdown, Nav} from 'react-bootstrap'

class NavBar extends Component {
	render() {
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="#home" >Graph-Viz</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="Algorithm" id="collasible-nav-dropdown">
							<NavDropdown.Item >BFS</NavDropdown.Item>
							<NavDropdown.Item >DFS</NavDropdown.Item>
							<NavDropdown.Item >A*</NavDropdown.Item>
			                                <NavDropdown.Item >Djikstra</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
		
				<Button variant="outline-warning" style={btnStyle} onClick={this.props.clear} >Clear</Button>{' '}
				<Button variant="outline-success" style={btnStyle} onClick={this.props.startButton} >Start</Button>{' '}
			</Navbar>
		)
	}
}

const btnStyle = {
	float: 'right',
	display: 'inline-block',
	position: 'relative',
	borderRadius: '15%',
	paddingLeft: '25px',
	paddingRight: '25px',
	marginLeft: '10px',
	marginRight: '10px'
}

export default NavBar
