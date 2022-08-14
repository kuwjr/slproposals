import { Card, Avatar } from "antd"

const { Meta } = Card;

const ProposalCard = ({ proposal }) =>{

    // helper functions
    const capitalizeWords = (string) => {
        let words = string.split(" ")
        let capitalizedString = []
        words.map((word) => {
            capitalizedString.push(word[0].toUpperCase() + word.substring(1));
        }).join(" ");
        return capitalizedString
    }

    const getAvatar = (type) => {
        if (type === 'bride') {
            return 'https://joeschmoe.io/api/v1/jabala'
        }
        return 'https://joeschmoe.io/api/v1/jai'
    }

    const getAge = (dob) => {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return(
        <Card hoverable style={{ width: 300, marginTop: 16 }} >
            <Meta
                title={
                    <div>
                        {proposal.first_name} - {getAge(proposal.dob)} years
                    </div>
                }
                avatar={<Avatar src={getAvatar(proposal.type)} />}
                description={
                    <div>
                        <p><b>Marital Status</b>: {capitalizeWords(proposal.marital_status)}</p>
                        <p><b>Profession</b>: {proposal.career}</p>
                        <p><b>Hometown</b>: {proposal.hometown}</p>
                        <p><b>Country</b>: {proposal.country}</p>
                    </div>
                }
            />
        </Card>
    )
}

export default ProposalCard