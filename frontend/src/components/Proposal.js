import { Avatar, Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BaseLayout from '../layouts/BaseLayout';
import { getAvatar } from '../lib/utils'

const Proposal = () => {

    const location = useLocation()

    const [proposal, setProposal] = useState(location.state)
    const [user, setUser] = useState(typeof(localStorage.getItem('user')) === 'undefined' ? null : JSON.parse(localStorage.getItem('user')))
    const [contact, setContact] = useState(<Link to='/login' >Login to view contact details</Link>)

    useEffect(() => {
        // if user is logged in -> show contact details
        if (user)
            setContact(proposal.contact_preference === 'Email' ? proposal.email : proposal.mobile_number)
    }, [user])

    return(
        <BaseLayout>
            <Card style={{width: '100%', justifyContent: 'center', display: 'flex'}} >

                <div style={{display: 'flex', justifyContent: "center", flexDirection: "column", textAlign: "left"}}>
                <Avatar style={{margin: "0 auto"}} size={100} src={getAvatar(proposal.type)} />
                <Typography.Title style={{textAlign: 'center'}} >{`${proposal.first_name} ${proposal.last_name}`}</Typography.Title>
                <Row>
                    <Col span={12}>
                        <p><b>Marital Status</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.marital_status}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Profession</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.career}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Hometown</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.hometown}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Type</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.type}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Highest level of Education</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.educational_level}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Field of Education</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.educational_field}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Person to contact</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.cp_name}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Relationship to bride/ groom</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.cp_relationship}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Contact</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{contact}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Country</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.country}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Height</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.height}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Weight</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.weight}</p>
                    </Col>
                    <Col span={12}>
                        <p><b>Expectations</b>: </p>
                    </Col>
                    <Col span={12}>
                        <p>{proposal.expectations}</p>
                    </Col>
                </Row>
                </div>
            </Card>
        </BaseLayout>
    )
}

export default Proposal