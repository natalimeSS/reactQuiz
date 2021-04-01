import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActtiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';

class Quiz extends Component {

    // quiz: [
    //     {
    //         question: 'What is the color of the sky',
    //         rightAnswerId: 2,
    //         id: 1,
    //         answers: [
    //             {text: 'Black', id: 1},
    //             {text: 'Blue', id: 2},
    //             {text: 'Red', id: 3},
    //             {text: 'Green', id: 4},
    //         ]
    //     },
    //     {
    //         question: 'When the Sankt-Petersburg was established',
    //         rightAnswerId: 3,
    //         id: 2,
    //         answers: [
    //             {text: '1700', id: 1},
    //             {text: '1705', id: 2},
    //             {text: '1703', id: 3},
    //             {text: '1803', id:4},
    //         ]
    //     }
    // ]

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
           <div className={classes.Quiz}>
               <div className={classes.QuizWrapper}>
                   <h1>Please answer all questions</h1>

                   {
                       this.props.loading || !this.props.quiz
                           ? <Loader/>
                           : this.props.isFinished
                           ? <FinishedQuiz
                               results={this.props.results}
                               quiz={this.props.quiz}
                               onRetry={this.props.retryQuiz}
                           />
                           : <ActiveQuiz
                               answers={this.props.quiz[this.props.activeQuestion].answer}
                               question={this.props.quiz[this.props.activeQuestion].question}
                               onAnswerClick={this.props.quizAnswerClick}
                               quizLength={this.props.quiz.length}
                               answerNumber={this.props.activeQuestion + 1}
                               state={this.props.answerState}
                           />
                   }
               </div>
           </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);