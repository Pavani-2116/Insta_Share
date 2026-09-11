import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import FailureView from '../FailureView/FailureView'
import {API,authOptions} from '../../utils/api'
const UserDetails=()=>{const {id}=useParams();const [data,setData]=useState(null);const [status,setStatus]=useState('loading');const load=async()=>{setStatus('loading');try{const r=await fetch(API.userProfile(id),authOptions());if(!r.ok)throw Error();const d=await r.json();setData(d.user_details);setStatus('success')}catch{setStatus('failure')}};useEffect(()=>{load()},[id]);return <div className="app-page"><Header/><main className="page-container">{status==='loading'&&<div className="loader-container" data-testid="loader"><div className="spinner"/></div>}{status==='failure'&&<FailureView onRetry={load}/>} {status==='success'&&<Profile profile={data}/>}</main></div>}
export default UserDetails
