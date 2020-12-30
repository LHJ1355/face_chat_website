import React from 'react';
import {useSelector} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavFunc(props){
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
      if(window.localStorage.getItem('token')) window.localStorage.removeItem('token');
        props.history.push("/login");
  };

  return(
    <div className="nav_bar">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>*/}
          {user.authInfo && user.authInfo.auth ?
            <Button variant="outline-info" onClick={logoutHandler}> 로그아웃 </Button> : 
            <React.Fragment>
              <Button variant="outline-info"> <Link to="/login">로그인</Link> </Button>  
              <Button variant="outline-info"> <Link to="/signup">회원가입</Link> </Button>
            </React.Fragment>
          }
        </Form>
      </Navbar>
    </div>
  )
}

export default withRouter(NavFunc);