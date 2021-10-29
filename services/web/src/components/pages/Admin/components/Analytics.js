import React, { useState, useEffect } from 'react';
import LoadingComponent from '../../../common/LoadingComponent';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Input, message, Button } from 'antd';
import { useSelector } from 'react-redux';

import styles from '../../../../styles/pages/admin.module.css';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const Analytics = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const orgId = currentUser.organization.id;

  const [peopleServed, setPeopleServed] = useState(0);
  const [familiesServed, setFamiliesServed] = useState(0);
  const [childrenServed, setChildrenServed] = useState(0);
  const [totalEraApproved, setTotalEraApproved] = useState(0);
  const [totalEraApprovedAmount, setTotalEraApprovedAmount] = useState(0);
  const [eraChildrenServed, setEraChildrenServed] = useState(0);
  const [eraPeopleServed, setEraPeopleServed] = useState(0);

  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);

  function getPeopleServed() {
    axiosWithAuth()
      .get('/analytics/people_served')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setPeopleServed(res.data.sumPeopleServed[0].sum || 0);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  function getEraPeopleServed() {
    axiosWithAuth()
      .get('/analytics/total_era_served')
      .then(res => {
        setEraPeopleServed(res.data.sumEraPeopleServed[0].sum || 0);
      })
      .catch(err => console.error(err));
  }

  function getFamiliesServed() {
    axiosWithAuth()
      .get('/analytics/families_served')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setFamiliesServed(res.data.sumFamiliesServed[0].count);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  function getChildrenServed() {
    axiosWithAuth()
      .get('/analytics/children_served')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setChildrenServed(res.data.sumChildrenServed[0].sum || 0);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  function getEraChildrenServed() {
    axiosWithAuth()
      .get('/analytics/era_children_served')
      .then(res => {
        // const erafamiliesServed = res.data.sumEraFamiliesServed;
        setEraChildrenServed(res.data.sumEraChildrenServed[0].sum || 0);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  function getTotalEraApproved() {
    axiosWithAuth()
      .get('/analytics/total_era_approved')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setTotalEraApproved(res.data.totalEraApproved[0].count || 0);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  function getTotalEraApprovedAmount() {
    axiosWithAuth()
      .get('/analytics/total_era_amount')
      .then(res => {
        // const familiesServed = res.data.sumFamiliesServed;
        setTotalEraApprovedAmount(res.data.totalEraApprovedAmount[0].sum || 0);
        // const numFamiliesServed = setFamiliesServed(familiesServed[0].count);
      })
      .catch(err => console.error(err));
  }

  // receive float and dollar sign and commas
  function formatNumber(num) {
    return (
      '$' +
      parseFloat(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }

  const getBudget = async () => {
    setLoading(true);
    try {
      let organization = await axiosWithAuth().get(`/orgs/${orgId}`);

      setBudget(organization.data.budget);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNewBudgetSubmit = async () => {
    try {
      await axiosWithAuth().put(`/orgs/${orgId}`, { budget });
    } catch (error) {
      message.error('error setting budget');
    }
  };

  const handleBudgetChange = e => {
    const { value } = e.target;

    if (isNaN(value)) return; // Only process numbers

    setBudget(value);
  };

  useEffect(() => {
    getFamiliesServed();
    getPeopleServed();
    getChildrenServed();
    getBudget();
    getTotalEraApproved();
    getTotalEraApprovedAmount();
    getEraChildrenServed();
    getEraPeopleServed();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.cardsContainer}>
      <Card value={peopleServed} title="Total served" color="#006ab3" />
      <Card value={familiesServed} title="Families served" color="#006ab3" />
      <Card value={childrenServed} title="Children served" color="#006ab3" />
      <Card
        value={totalEraApproved}
        title="Total ERA approved"
        color="#006ab3"
      />
      <Card
        value={formatNumber(totalEraApprovedAmount)}
        title="Total ERA approved amount"
        color="#006ab3"
      />
      <Card
        value={eraChildrenServed}
        title="ERA children served"
        color="#006ab3"
      />
      <Card value={eraPeopleServed} title="ERA people served" color="#006ab3" />
    </div>
  );
};

const Card = props => {
  const [isEditing, setIsEditing] = useState(false);

  const onDoubleClick = () => {
    if (!props.editable) return;

    setIsEditing(true);
  };

  const onSubmit = () => {
    if (props.onSubmit) props.onSubmit();

    setIsEditing(false);
  };
  return (
    <div>
      <div style={{ backgroundColor: props.color }} className={styles.card}>
        {props.editable && (
          <div className={styles.icons}>
            {isEditing ? (
              <>
                <CloseOutlined
                  onClick={() => setIsEditing(false)}
                  className={styles.icon}
                />
                <CheckOutlined onClick={onSubmit} className={styles.icon} />
              </>
            ) : (
              <EditOutlined
                onClick={() => setIsEditing(true)}
                className={styles.icon}
              />
            )}
          </div>
        )}
        {isEditing ? (
          <Form onFinish={onSubmit}>
            <Input
              onChange={props.onChange}
              size="large"
              style={{ width: '50%', fontSize: '2rem' }}
              autoFocus={true}
              value={props.value}
              defaultValue={props.value}
            />
            <Button htmlType="submit" />
          </Form>
        ) : (
          <h3 onDoubleClick={onDoubleClick} className={styles.value}>
            {props.value}
          </h3>
        )}
        <h4 className={styles.title}>{props.title}</h4>
      </div>
    </div>
  );
};

export default Analytics;
