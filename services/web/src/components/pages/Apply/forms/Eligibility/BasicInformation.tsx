import React, { useState } from 'react';

//Components
import CardTitle from '../../CardTitle';
//Utils
import { states } from '../../../../../utils/data/states';
import { genders } from '../../../../../utils/data/genders';

//UI
import {
  Card,
  Checkbox,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Divider,
} from 'antd';
import { DoubleArrow } from '@material-ui/icons';

const { Option } = Select;
const { Title } = Typography;

const BasicInformation = ({
  formValues,
  handleApplicantChange,
  handleCheckBoxChange,
  handleDateChange,
  handleChange,
  onRoleChange,
  onStateChange,
  onGenderChange,
  date,
  datestring,
}) => {
  return (
    <div>
      <Card title={<CardTitle percentage={20} title="Demographics" />}>
        <p>
          Please answer the following questions about the Head of the Household
          (The person responsible for managing the rent and utility payments for
          this household)
        </p>
        <br />

        <Form.Item
          name="dob"
          label="Date of Birth (YYYY-MM-DD)"
          rules={[{ required: true, message: 'Date of Birth is required' }]}
        >
          <DatePicker
            placeholder="1981-02-13"
            onChange={handleDateChange}
          ></DatePicker>
        </Form.Item>

        <b>
          Please enter the ages of any children in your household, separated by
          commas:
        </b>

        <Form.Item
          initialValue={formValues.childrenAges}
          label="Children Ages"
          name="childrenAges"
          rules={[
            {
              type: 'string',
              required: true,
              message:
                'Please enter the ages of any children in the household, separated by commas',
            },
          ]}
        >
          <Input
            name="childrenAges"
            placeholder="4, 2, etc."
            value={formValues.childrenAges}
          />
        </Form.Item>

        <Title level={5}>Head of Household Identifies as</Title>

        <Form.Item label="Ethnicity:">
          <Checkbox
            checked={formValues.hispanic}
            name="hispanic"
            onChange={handleCheckBoxChange}
          >
            Hispanic / Latinx
          </Checkbox>
        </Form.Item>

        <Form.Item label="Race:">
          <Checkbox
            checked={formValues.asian}
            onChange={handleCheckBoxChange}
            name="asian"
          >
            Asian
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.black}
            onChange={handleCheckBoxChange}
            name="black"
          >
            Black or African American
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.pacific}
            onChange={handleCheckBoxChange}
            name="pacific"
          >
            Native Hawaiian or Other Pacific Islander
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.white}
            onChange={handleCheckBoxChange}
            name="white"
          >
            White
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.native}
            onChange={handleCheckBoxChange}
            name="native"
          >
            Native American or Alaskan Native
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.demoNotSay}
            onChange={handleCheckBoxChange}
            name="demoNotSay"
          >
            Rather Not Say
          </Checkbox>
        </Form.Item>

        <Title level={5}>Head of Household's Address</Title>

        <Form.Item
          hasFeedback
          initialValue={formValues.state}
          label="State"
          name="state"
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Select
            onChange={onStateChange}
            showSearch
            placeholder="Select a state"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.cityName}
          label="City"
          name="cityName"
          rules={[
            { required: true, min: 3, message: 'City is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="cityName" value={formValues.city} />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.address}
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'Address is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="address" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input name="addressLine2" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.zipCode}
          label="Postal Code"
          name="zipCode"
          rules={[
            {
              type: 'number',
              required: true,
              message: 'Postal code is required',
            },
            {
              required: true,
              pattern: RegExp(/^\d{5}$/),
              message: 'Invalid postal code',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} name="zipCode" />
        </Form.Item>

        <Title level={5}>Gender</Title>

        <Divider dashed />

        <Form.Item
          hasFeedback
          initialValue={formValues.gender}
          name="gender"
          rules={[
            {
              required: true,
              message:
                'Please select the gender you most closely identify with',
            },
          ]}
        >
          <Select
            onChange={onGenderChange}
            showSearch
            placeholder="Select a gender you most closely identify with"
          >
            {genders.map(gender => (
              <Option value={gender}>{gender}</Option>
            ))}
          </Select>
        </Form.Item>

        <Title level={5}>
          Family Member Demographics (other than head of household)
        </Title>

        <Divider dashed />

        <Form.Item>
          <Checkbox
            checked={formValues.hispanic}
            name="hispanic"
            onChange={handleCheckBoxChange}
          >
            Hispanic/ Latino
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.asian}
            onChange={handleCheckBoxChange}
            name="asian"
          >
            Asian
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.black}
            onChange={handleCheckBoxChange}
            name="black"
          >
            Black or African American
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.pacific}
            onChange={handleCheckBoxChange}
            name="pacific"
          >
            Native Hawaiian or Other Pacific Islander
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.white}
            onChange={handleCheckBoxChange}
            name="white"
          >
            White
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.native}
            onChange={handleCheckBoxChange}
            name="native"
          >
            Native American or Alskan Native
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.demoNotSay}
            onChange={handleCheckBoxChange}
            name="demoNotSay"
          >
            Rather Not Say
          </Checkbox>
        </Form.Item>
      </Card>
    </div>
  );
};

export default BasicInformation;
