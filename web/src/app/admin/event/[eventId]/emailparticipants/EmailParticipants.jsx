import React, { useEffect, useState } from 'react';
import { Checkbox, Table, Typography, Button, message } from 'antd';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const EmailParticipants = ({ eventId = "DahdqaVm3RbxTTf3vh6i" }) => {
    const [participants, setParticipants] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchParticipants();
    }, [eventId]);

    const fetchParticipants = async () => {
        try {
            const q = query(collection(db, "event_notifications"), where("eventId", "==", eventId), where("notified", "==", true));
            const notifiedSnapshot = await getDocs(q);
            const notifiedEmails = new Set(notifiedSnapshot.docs.map(doc => doc.data().email));

            const participantsSnapshot = await getDocs(collection(db, "participants"));
            const data = participantsSnapshot.docs
                .map(doc => ({ key: doc.id, name: doc.data().name, email: doc.data().email }))
                .filter(participant => !notifiedEmails.has(participant.email));

            setParticipants(data);
        } catch (error) {
            console.error("Failed to fetch participants:", error);
            message.error("Could not fetch participants data.");
        }
    };

    const handleEmail = async () => {
        const selectedParticipants = participants.filter(participant => selectedRowKeys.includes(participant.key));
        const emailsString = selectedParticipants.map(participant => participant.email).join(',');

        if (emailsString) {
            const mailtoLink = `mailto:${emailsString}?subject=Notification for Event&body=Hi, you are notified about the event.&cc=ifamhabonehabone@gmail.com`;
            window.open(mailtoLink, '_blank');

            for (let participant of selectedParticipants) {
                await addDoc(collection(db, "event_notifications"), {
                    eventId,
                    email: participant.email,
                    notified: true
                });
            }

            message.success("Emails prepared to send and participants will be marked as notified.");
            fetchParticipants();  // Refresh the participant list to reflect changes
        } else {
            message.info("Please select at least one participant to email.");
        }
    };

    const onSelectChange = selectedKeys => {
        setSelectedRowKeys(selectedKeys);
    };

    const onSelectAll = (selected, selectedRows) => {
        setSelectAll(selected);
        const keys = selected ? participants.map(participant => participant.key) : [];
        setSelectedRowKeys(keys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        onSelectAll: onSelectAll,
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <div>
            <Checkbox
                onChange={e => onSelectAll(e.target.checked)}
                checked={selectAll}
                indeterminate={!selectAll && selectedRowKeys.length > 0}
                style={{ marginBottom: 16 }}
            >
                Select All
            </Checkbox>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={participants}
                pagination={false}
            />
            <Button
                type="primary"
                onClick={handleEmail}
                disabled={!selectedRowKeys.length}
                style={{ marginTop: 16 }}
            >
                Email Selected Participants
            </Button>
        </div>
    );
};

export default EmailParticipants;
