import React from 'react'
import { connect } from 'react-redux'
import { onLogin, onSignup } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, TextField, Avatar, Grid, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class _ToyLoginSignup extends React.Component {
    state = {
        isSignup: false
    }
    AcordionContent = [
        { heading: 'Want to be admin?', content: 'Login with this credentials Username: admin and Password: admin ' },
    ]
    componentDidMount() {
        if (this.props.user) this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required username';
        }
        if (!values.password) {
            errors.password = 'Required password';
        }
        if (this.state.isSignup && !values.fullname) {
            errors.fullname = 'Required fullname';
        }
        return errors;
    }

    onFormSubmit = async (values, { setSubmitting }) => {
        try {
            const res = this.state.isSignup ? await this.props.onSignup(values) : await this.props.onLogin(values)
            if (!res) {
                (this.state.isSignup) ? showErrorMsg('User already exists') : showErrorMsg('Wrong credentials')
            } else {
                this.props.history.push('/')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    }


    render() {
        const { isSignup } = this.state;
        const initialValues = { fullname: '', username: '', password: '' }
        const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />
        return (
            <>
                <Container component="main" className="login-container" maxWidth="xs">
                    <div className="flex column align-center">
                        <Avatar className="avatar" >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {isSignup ? 'Signup' : 'Login'}
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validate={this.validate}
                            onSubmit={this.onFormSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form style={{ width: '100%' }}>
                                    {isSignup && <>
                                        <Field
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="fullname"
                                            label="Full Name"
                                            type="text"
                                            autoComplete="current-password"
                                            as={TextFieldOutlined}
                                            required
                                        />
                                        <ErrorMessage name="fullname" component="div" />
                                    </>

                                    }
                                    <Field
                                        margin="normal"
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        as={TextFieldOutlined}
                                        required
                                    />
                                    <ErrorMessage name="username" component="div" />
                                    <Field
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        as={TextFieldOutlined}
                                        required
                                    />
                                    <ErrorMessage name="password" component="div" />
                                    <Button
                                        fullWidth
                                        variant={'contained'}
                                        color={'primary'}
                                        type="submit"
                                        disabled={isSubmitting}>
                                        {!isSignup ? 'Login' : 'Signup'}
                                    </Button>

                                </Form>
                            )}
                        </Formik>
                        <Grid container>
                            <Grid item>
                                <Link to="/login" onClick={this.toggleSignup} style={{ color: "black" }}>
                                    {!isSignup ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <Accordion className="about-acord" allowZeroExpanded allowMultipleExpanded>
                        {this.AcordionContent.map((singleAccordion, idx) =>
                        (<AccordionItem key={idx}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {singleAccordion.heading}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    {singleAccordion.content}
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>)
                        )}
                    </Accordion>
                </Container>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
}



export const ToyLoginSignup = connect(mapStateToProps, mapDispatchToProps)(_ToyLoginSignup)