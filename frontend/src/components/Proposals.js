import { message, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from '../lib/axios'
import { Link } from 'react-router-dom'
import BaseLayout from '../layouts/BaseLayout';
import ProposalCard from './ProposalCard';

const Proposals = () => {

    const [proposals, setProposals] = useState([])

    useEffect(() => {
        // fetch all proposals
        axios.get(`/proposals`).then(function (response) {
            setProposals(response.data)
        }).catch(function (error) {
            if (error.response.data)
                message.error(error.response.data);
            else
                console.log('Caught an error: ', error)
        });
    }, []);

    return (
        <BaseLayout>
            <h1>All Proposals</h1>

            <Row gutter={0} >
                {
                    proposals.map((proposal, key) => {
                        return (
                            <Link
                                key={key}
                                to={`/proposals/${proposal._id}`}
                                state={proposal}
                            >
                                <ProposalCard proposal={ proposal } />
                            </Link>
                        )
                    })
                }
            </Row>
        </BaseLayout>
    )
}

export default Proposals