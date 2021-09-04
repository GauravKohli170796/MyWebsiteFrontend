import React, { useState,useEffect,useRef} from 'react';
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/Navbar.css";
import "../styles/CreateQuiz.css";
import TypeWriterMessageContainer from "./TypeWriterMessageContainer";
import { CreateQuizArray } from "../Constants/Messages";
import {QuizQuestions,placeholderQuizQuestion} from "../Constants/Questions";
import {BACKEND_URL,NOTIFICATION_CLOSE_TIME,NOTIFICATION_THEME} from "../Constants/Config";
import axios from "axios";
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";


function CreateYourOwnQuiz() {

    const [bNavbarShow, setbNavbarShow] = useState(false);
    const [QuizCreator, setQuizCreator] = useState("");
    const [IsAllowedToCreateQuiz, setIsAllowedToCreateQuiz] = useState(false);
    const [QuizQuestionNo,setQuizQuestionNo]=useState();
    const [QuizQuestion,setQuizQuestion]=useState(QuizQuestions);
    const history = useHistory({});
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
    return (
        <div className="QuizCls">
            <Header bNavbarShow={bNavbarShow} setbNavbarShow={setbNavbarShow} ></Header>
           <div ref={navRef}><SideNavbar bNavbarShow={bNavbarShow}></SideNavbar></div> 

            <div className="mainC">



                <div className="mainContainer">

                    <TypeWriterMessageContainer title="Here you can do!" msgArray={CreateQuizArray}></TypeWriterMessageContainer>

                    {!IsAllowedToCreateQuiz && <div className="QuizCreaterDetails">
                           <form onSubmit={() => {
                                if(QuizCreator)
                                {
                                    setIsAllowedToCreateQuiz(true);
                                }
                                else
                                {
                                    toast.warning("Enter your name First.Then you can create your Quiz");
                                    setIsAllowedToCreateQuiz(false);
                                }
                             
                            }}>
                            <lable className="lbl">Enter Your Name</lable>
                            <input type="text" placeholder="e.g Gaureesha" name="Creator Name" value={QuizCreator} onChange={(e) => { setQuizCreator(e.target.value) }} autocomplete="off" required />
                            <lable className="lbl">Enter no. of questions you would ask</lable>
                            <input type="number" placeholder="Any value between 2 and 10"max="10" min="2" name="Creator Name" value={QuizQuestionNo} onChange={(e) => { setQuizQuestionNo(parseInt(e.target.value)) }} autocomplete="off" required />
                            <button type="submit" className="btnsubmit" >Crete Quiz</button>
                            </form>


                    </div>}
                   {IsAllowedToCreateQuiz && <div className="creatorMessage">
                        <span>Hello {QuizCreator}!!  Enter {QuizQuestionNo} questions and options of your choice.</span>
                    </div>}
                   {IsAllowedToCreateQuiz && <div className="Questionscontainer">
                    <form onSubmit={(e)=>{handleQuizQuestionsSubmit(e)}}>
                     {renderQuestions()}
                     <button type="submit" className="btnsubmit">Submit Questions</button>
                     </form>
                    </div>}
                   
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



    function renderQuestions()
    {
        let tmpQuizQuestion=QuizQuestion.slice(0,QuizQuestionNo);
       return Array.isArray(tmpQuizQuestion) && tmpQuizQuestion.map((jsonQuestion,index)=>{
         return <div className="questionContainer">
                <div className="questionNo">
                <span>Enter details of Question {index +1 }</span>
                </div>
                <div classname="question">
                 <input type="text" value={QuizQuestion[index].Questions} placeholder={placeholderQuizQuestion[index].Questions} onChange={(e)=>{handleQuizQuestionChange(e,index)}} required></input>
                </div>
                <div className="options"> 
                <input type="text" value={QuizQuestion[index].OptionA} placeholder={placeholderQuizQuestion[index].OptionA} onChange={(e)=>{handleOptionChange(e,index,"OptionA")}} required></input>
                <input type="text" value={QuizQuestion[index].OptionB} placeholder={placeholderQuizQuestion[index].OptionB} onChange={(e)=>{handleOptionChange(e,index,"OptionB")}} required></input>
                <input type="text" value={QuizQuestion[index].OptionC} placeholder={placeholderQuizQuestion[index].OptionC} onChange={(e)=>{handleOptionChange(e,index,"OptionC")}} required></input>
                <input type="text" value={QuizQuestion[index].OptionD} placeholder={placeholderQuizQuestion[index].OptionD} onChange={(e)=>{handleOptionChange(e,index,"OptionD")}} required></input>
                <select defaultValue="" onChange={(e)=>{handleCorrectAnswerChange(e,index)}} required>
                    <option value="" disabled selected>Select the correct option</option>
                    <option value="OptionA">Option A</option>
                    <option value="OptionB">Option B</option>
                    <option value="OptionC">Option C</option>
                    <option value="OptionD">Option D</option>
                </select>
                </div>
    

            </div>

        })

    }

    function handleQuizQuestionChange(e,index)
    {
        let tmpQuizQuestion=[...QuizQuestion];
        tmpQuizQuestion[index]["Questions"]=e.target.value;
        setQuizQuestion(tmpQuizQuestion);
    }

    function handleOptionChange(e,index,option)
    {
        let tmpQuizQuestion=[...QuizQuestion];
        tmpQuizQuestion[index][option]=e.target.value;
        setQuizQuestion(tmpQuizQuestion);
    }

    function handleCorrectAnswerChange(e,index)
    {
        let tmpQuizQuestion=[...QuizQuestion];
        tmpQuizQuestion[index]["CorrectAns"]=e.target.value;
        setQuizQuestion(tmpQuizQuestion);

    }

    function handleQuizQuestionsSubmit(e)
    {
       e.preventDefault();
       let tmpQuizQuestion=QuizQuestion.slice(0,QuizQuestionNo);
       axios.post(`${BACKEND_URL}Quiz/CreateUserQuiz`,{QuizreatorName:QuizCreator,QuizQuestionsArray:tmpQuizQuestion})
       .then(response => {
             if(response.data.ErrCode===0)
             {
                toast.success(response.data.ResMsg);
                history.push('GetQuizUrl',{UniqueIdentifier:response.data.UniqueIdentifier,CretorName:QuizCreator});
             }
             else if(response.data.ErrCode===1)
             {
                toast.info(response.data.ResMsg);
             }
             else
             {
                toast.error(response.data.ResMsg);
             }
           })
         .catch(err=>{
             toast.error(err.message);
         })
   }
}

export default CreateYourOwnQuiz;
