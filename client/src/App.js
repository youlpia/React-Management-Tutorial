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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth:1080
  },
  progress: {
    margin: theme.spacing.unit * 2
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
      completed:0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed:0
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

  render() {
    const { classes } = this.props;
    return (
     <div>
      <Paper className={classes.root}>      
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>   
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>                                             
            <TableCell>설정</TableCell>              
          </TableRow>
        </TableHead>

        <TableBody>
        {
        this.state.customers ? 
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
        }) : 
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
