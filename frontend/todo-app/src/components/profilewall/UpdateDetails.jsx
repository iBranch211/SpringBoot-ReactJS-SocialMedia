import React, { Component } from "react";
import "./profile.scss";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from "../todo/AuthenticationService";
import AccountProfileService from "../../api/todo/AccountProfileService";

class UpdateDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            studentnumber: this.props.studentnumber,
            email: this.props.email,
            phonenumber: this.props.phonenumber,
            aboutme: this.props.aboutme
        }
        this.validate = this.validate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        console.warn("componentDidMount CC");
        this.refreshInfo();
        console.log(this.state);
    }

    refreshInfo() {
        let username = AuthenticationService.getLoggedInUserName();
        AccountProfileService.retrieveDetails(username)
            .then(response => {
                console.error("response cc", response.data);
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    studentnumber: response.data.studentnumber,
                    phonenumber: response.data.phonenumber,
                    aboutme: response.data.aboutme
                });
            })
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        this.setState({
            firstname: values.firstname,
            lastname: values.lastname,
            studentnumber: values.studentnumber,
            email: values.email,
            phonenumber: values.phonenumber,
            aboutme: values.aboutme
        })


        AccountProfileService.updateDetails(username,
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.studentnumber,
            this.state.phonenumber,
            this.state.aboutme)

        window.location.reload();
    }

    validate(values) {
        let errors = {}
        const nameCheck = /^[a-zA-Z\s]*$/
        const phoneCheck = /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/
        const emailCheck = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (values.firstname == null) {
            errors.firstname = 'Enter your first name'
        } else if (!nameCheck.test(values.firstname)) {
            errors.firstname = 'Please enter a valid name'
        }

        if (values.lastname == null) {
            errors.lastname = 'Enter your last name'
        } else if (!nameCheck.test(values.lastname)) {
            errors.lastname = 'Please enter a valid name'
        }

        if (values.phonenumber == null) {
            errors.phonenumber = 'Enter your phone number'
        } else if (!phoneCheck.test(values.phonenumber)) {
            errors.phonenumber = 'Please enter a valid phone number'
        }

        if (values.email == null) {
            errors.email = 'Enter your email'
        } else if (!emailCheck.test(values.email)) {
            errors.email = 'Please enter a valid email'
        }


        return errors

    }

    render() {

        return (
            <div className="col3">
                <div className="ui-block">
                    <div className="ui-title">Update Contact Details</div>
                    <div className="ui-content">
                        <div className="personal-info">
                            <Formik

                                onSubmit={this.onSubmit}
                                initialValues={this.state}
                                validateOnChange={this.validate}
                                validateOnBlur={this.validate}
                                validateOnSubmit={this.validate}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>

                                            <fieldset className="form-group">
                                                <label className="title">First name</label>
                                                <Field className="form-control" type="text" name="firstname" />
                                            </fieldset>
                                            <ErrorMessage name="firstname" component="div"
                                                className="alert alert-warning" />

                                            <fieldset className="form-group">
                                                <label className="title">Last name</label>
                                                <Field className="form-control" type="text" name="lastname" />
                                            </fieldset>
                                            <ErrorMessage name="lastname" component="div"
                                                className="alert alert-warning" />
                                            <fieldset className="form-group">
                                                <label className="title">Student number</label>
                                                <Field className="form-control" type="text" readOnly name="studentnumber" />
                                            </fieldset>

                                            <fieldset className="form-group">
                                                <label className="title">Email</label>
                                                <Field className="form-control" type="text" name="email" />
                                            </fieldset>
                                            <ErrorMessage name="email" component="div"
                                                className="alert alert-warning" />
                                            <fieldset className="form-group">
                                                <label className="title">Phone number</label>
                                                <Field className="form-control" type="text" name="phonenumber" />
                                            </fieldset>
                                            <ErrorMessage name="phonenumber" component="div"
                                                className="alert alert-warning" />
                                            <fieldset className="form-group">
                                                <label className="title">About me</label>
                                                <Field className="form-control" type="text" name="aboutme" />
                                            </fieldset>

                                            <button className="btn btn-success" type="submit">Save</button>
                                        </Form>
                                    )
                                }

                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




}

export default UpdateDetails