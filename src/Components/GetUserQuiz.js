import React, { useState, useEffect,useRef } from 'react';
import axios from "axios";
import { BACKEND_URL, NOTIFICATION_CLOSE_TIME, NOTIFICATION_THEME } from "../Constants/Config";
import { CreateQuizArray } from "../Constants/Messages";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import TypeWriterMessageContainer from "./TypeWriterMessageContainer";
import "../styles/Navbar.css";
import "../styles/CreateQuiz.css";
import 'react-toastify/dist/ReactToastify.css';

function GetUserQuiz({ match }) {
    const [UserJsonQuestions, setUserJsonQuestions] = useState([]);
    const [AttemptedUserJsonArray, setAttemptedUserJsonArray] = useState([]);
    const [IsAllowedToAttemptQuiz, setIsAllowedToAttemptQuiz] = useState(false);
    const [bNavbarShow, setbNavbarShow] = useState(false);
    const [CurrentQuestionAns,setCurrentQuestionAns]=useState("");
    const [QuizAttempter, setQuizAttempter] = useState("");
    const [CurrentQuestion, setCurrentQuestion] = useState(0);
    const [CorrectQuestion, setCorrectQuestion] = useState(0);


    const CreatorName = match.params.CreatorName;
    const QuizUniqueIdentifier = match.params.QuizUniqueIdentifier;
    let navRef=useRef(null);
    let handler=(event)=>{
        if(!navRef.current.contains(event.target))
        {
            setbNavbarShow(false);
        }
    }
    useEffect(() => {
       document.addEventListener("scroll",handler);
       return ()=>{
           document.removeEventListener("scroll",handler);
       }
    }, [navRef])

    useEffect(()=>{
             if(CurrentQuestion && UserJsonQuestions.length>0 && (CurrentQuestion===UserJsonQuestions.length))
            {
                axios.post(`${BACKEND_URL}Quiz/SubmitAttempterScore`,{QuizSubmitterName:QuizAttempter,QuizUniqueIdentifier:match.params.QuizUniqueIdentifier,QuizCreatorName:match.params.CreatorName,QuizSubmitterScore:CorrectQuestion})
                .then(response => {
                    if (response.data.ErrCode === 0) {
                        setAttemptedUserJsonArray(response.data.AttempterUsersArrayJson);
                    }
                    else if (response.data.ErrCode === 1) {
                        toast.info(response.data.ResMsg);
                    }
                    else {
                        toast.error(response.data.ResMsg);
                    }
                })
                .catch(err => {
                        toast.error(err.message);
                    })
                
            }

    },[CurrentQuestion]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}Quiz/GiveQuizTest/${CreatorName}/${QuizUniqueIdentifier}`).then(response => {
            if (response.data.ErrCode === 0) {
                setUserJsonQuestions(response.data.UserQuestionJson);
                setAttemptedUserJsonArray(response.data.AttemptedUserJsonArray);
            }
            else if (response.data.ErrCode === 1) {
                toast.info(response.data.ResMsg);
            }
            else {
                toast.error(response.data.ResMsg);
            }
        })
            .catch(err => {
                toast.error(err.message);
            })
    }, [CreatorName,QuizUniqueIdentifier]);

    return (
        <div className="QuizCls">
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>
            <div ref={navRef}><SideNavbar bNavbarShow={bNavbarShow}></SideNavbar></div>

            <div className="mainC">



                <div className="mainContainer">

                    <TypeWriterMessageContainer title="Here you can do!" msgArray={CreateQuizArray}></TypeWriterMessageContainer>

                    {!IsAllowedToAttemptQuiz && UserJsonQuestions.length > 0 && <div className="QuizCreaterDetails">
                        <form onSubmit={() => {
                            if (QuizAttempter) {
                                setIsAllowedToAttemptQuiz(true);
                            }
                            else {
                                toast.warning("Enter your name First.Then you can attempt Quiz");
                                setIsAllowedToAttemptQuiz(false);
                            }

                        }}>
                            <label className="lbl">Enter Your Name</label>
                            <input type="text" placeholder="e.g Gaureesha" name="Creator Name" value={QuizAttempter} onChange={(e) => { setQuizAttempter(e.target.value) }} autoComplete="off" required />
                            <button type="submit" className="btnsubmit" >Attempt Quiz</button>
                        </form>


                    </div>}

                    {UserJsonQuestions.length > 0 && Array.isArray(AttemptedUserJsonArray) && AttemptedUserJsonArray.length>0 &&<div className="rankTable">
                    <p className="rankTableHeading">Leaderboard for this Quiz</p>
                        <table id="customers">
                            <tr>{renderTableHeader()}</tr>
                            {renderTableValues()}
                        </table>
                    </div>}

                    {IsAllowedToAttemptQuiz && UserJsonQuestions.length > 0 && (CurrentQuestion < UserJsonQuestions.length) && <div className="creatorMessage rankMsgborder">
                        <span>Hello {QuizAttempter}!!  Best of luck for your friends quiz</span>
                    </div>}
                    {IsAllowedToAttemptQuiz && UserJsonQuestions.length > 0 && (UserJsonQuestions.length===CurrentQuestion) &&<div className="creatorMessage rankMsgborder">
                        <p className="CongoMsg">Congratulation!! You have completed the quiz</p>
                        <span>Hello {QuizAttempter}!!  Your Score is {CorrectQuestion}/{UserJsonQuestions.length} </span>
                    </div>}
                    {IsAllowedToAttemptQuiz && UserJsonQuestions.length > 0 && (CurrentQuestion < UserJsonQuestions.length) && <form onSubmit={(e) => { 
                        e.preventDefault();
                        console.log(UserJsonQuestions[CurrentQuestion].CorrectAns,CurrentQuestionAns)
                        if(UserJsonQuestions[CurrentQuestion].CorrectAns===CurrentQuestionAns)
                            {
                                setCorrectQuestion(CorrectQuestion+1);
                            }
                        if(CurrentQuestion+1<UserJsonQuestions.length)
                        {
                            setCurrentQuestionAns("");
                            setCurrentQuestion(CurrentQuestion + 1);
                        }
                        else if(CurrentQuestion+1===UserJsonQuestions.length)
                        {
                            setCurrentQuestionAns("");
                            setCurrentQuestion(CurrentQuestion + 1);
                            // axios.post(`${BACKEND_URL}Quiz/SubmitAttempterScore`,{QuizSubmitterName:QuizAttempter,QuizUniqueIdentifier:match.params.QuizUniqueIdentifier,QuizCreatorName:match.params.CreatorName,QuizSubmitterScore:CorrectQuestion})
                            // .then(response => {
                            //     if (response.data.ErrCode === 0) {
                            //         setAttemptedUserJsonArray(response.data.AttempterUsersArrayJson);
                            //     }
                            //     else if (response.data.ErrCode === 1) {
                            //         toast.info(response.data.ResMsg);
                            //     }
                            //     else {
                            //         toast.error(response.data.ResMsg);
                            //     }
                            // })
                            // .catch(err => {
                            //         toast.error(err.message);
                            //     })
                            
                        }
                     }}>
                    
                        <div className="Questionscontainer">

                            {renderQuestions()}
                        </div>
                        <button type="submit" className="btnsubmit">{(CurrentQuestion === (UserJsonQuestions.length - 1)) ? "Submit Quiz" : "Next Question"}</button>
                    </form>}

                    <ToastContainer position="top-right"
                        autoClose={NOTIFICATION_CLOSE_TIME}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        theme={NOTIFICATION_THEME}
                        transition={Zoom}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )


    function renderQuestions() {
        return <div className="questionContainer">
            <div className="questionNo">
                <span>Attempting Question {CurrentQuestion+1}/{UserJsonQuestions.length}</span>
            </div>
            <div className="attemptquestionNo">
                <span>Question {CurrentQuestion + 1}- {UserJsonQuestions[CurrentQuestion].Questions}</span>
            </div>
            <div className="attemptoptions">
                <input type="radio" value="OptionA" checked={CurrentQuestionAns==="OptionA"} name={UserJsonQuestions[CurrentQuestion].Questions} onChange={(e) => { handleOptionChange(e) }} required></input><span className="Options">{UserJsonQuestions[CurrentQuestion].OptionA}</span>
                <input type="radio" value="OptionB" checked={CurrentQuestionAns==="OptionB"} name={UserJsonQuestions[CurrentQuestion].Questions} onChange={(e) => { handleOptionChange(e) }} required></input><span className="Options">{UserJsonQuestions[CurrentQuestion].OptionB}</span>
                <input type="radio" value="OptionC" checked={CurrentQuestionAns==="OptionC"} name={UserJsonQuestions[CurrentQuestion].Questions} onChange={(e) => { handleOptionChange(e) }} required></input><span className="Options">{UserJsonQuestions[CurrentQuestion].OptionC}</span>
                <input type="radio" value="OptionD" checked={CurrentQuestionAns==="OptionD"} name={UserJsonQuestions[CurrentQuestion].Questions} onChange={(e) => { handleOptionChange(e) }} required></input><span className="Options">{UserJsonQuestions[CurrentQuestion].OptionD}</span>
            </div>


        </div>

    }

    function handleOptionChange(e) {
        setCurrentQuestionAns(e.target.value);
    }

    function renderTableHeader()
    {
        let Headers=["RANK","NAME","SCORE"];
      return Headers.map((header,index)=>{
          return <th key={index}>{header}</th>

      });
    }

    function renderTableValues()
    {
       return AttemptedUserJsonArray.length>0 && AttemptedUserJsonArray.map((usrDetails,index)=>{
           return <tr key={index}>
                   <td>{index+1}</td>
                   <td>{usrDetails.QUIZ_SUBMITTER_NAME}</td>
                   <td>{usrDetails.QUIZ_SUBMITTER_SCORE}/{UserJsonQuestions.length}</td>
                  </tr>
       })
    }
}





export default GetUserQuiz;