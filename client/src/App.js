import React, { Component } from 'react';
//import logo from './logo.svg';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
//import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';


const styles = theme => ({
  root: {
    width: '100%',
    //marginTop: theme.spacing.unit * 3,
    //overflowX: "auto",
    minWidth:1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },

  //table: {    minWidth:1080  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },


  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }


}); //주석처리 하면 위에 ;(세미콜론) 해주어야 함.
/* 
const customers = [
  {
  'id' : 1,
  'image': 'https://placeimg.com/64/64/1',
  'name' : '홍길자',
  'birthday' : '961212',
  'gender' : '남자',
  'job' : '대학생'    
},
{
  'id' : 2,
  'image': 'https://placeimg.com/64/64/2',
  'name' : '김동민',
  'birthday' : '980215',
  'gender' : '여자',
  'job' : '디지아너'    
},
{
  'id' : 3,
  'image': 'https://placeimg.com/64/64/3',
  'name' : '안동아',
  'birthday' : '990211',
  'gender' : '남자',
  'job' : '웹프로그래머'    
}
]
*/
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      serchKeyword: ''      
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      serchKeyword: ''
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));    
  } 

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);//0.02초
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
//서버에서 직접 Api받아오는것.
  callApi = async () => {
    const response = await fetch('./api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.serchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
     <div className={classes.root}>
       <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="serchKeyword"
              value={this.state.serchKeyword}              
              onChange={this.handleValueChange}
            />
          </div>      
          
        </Toolbar>
      </AppBar>
      <div className={classes.menu}> 
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      <Paper className={classes.paper}>      
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {cellList.map(c => {
              return <TableCell className={classes.tableHead}>{c}</TableCell>
            })}

{/*
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>   
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>                                             
            <TableCell>설정</TableCell> 
*/}
          </TableRow>
        </TableHead>

        <TableBody>
        {
        this.state.customers ? 
        filteredComponents(this.state.customers) :

      /*
        this.state.customers.map(c => {
          return (
            <Customer
            stateRefresh={this.stateRefresh}
            key={c.id}
             id={c.id}
             image={c.image}
             name={c.name}
             birthday={c.birthday}
             gender={c.gender}
             job={c.job}                          
             />
          );
        }) 
      */        
        
           <TableRow>
            <TableCell colSpan="6" align="center">
             <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>          
            </TableCell>
           </TableRow> 
          }             
          </TableBody>   
         </Table>
        </Paper> 
       <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>            
    );
  }
}

export default withStyles(styles)(App);
