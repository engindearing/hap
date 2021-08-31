import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useWindowDimensions from '../../../../../utils/useWindowDimensions';

import { buildDocumentStatuses } from '../../../../../redux/requests/requestActions';

//Migrate styles to less so it will all be in one place
import '../../../../../styles/overrides.less';
import '../../../../../styles/pages/Home/home.less';

import StatusBar from './StatusBar';
import CommentsContainer from './CommentsContainer';
import UserInfo from './UserInfo/index';
import Documents from './Documents/index';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

import checkIfAllDocumentsAreSubmitted from './Documents/utils/checkIfAllDocumentsAreSubmitted';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

export default function Index() {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const request = useSelector(state => state.requests.request);
  const documents = useSelector(state => state.requests.documents);

  // Build Document Statuses now - to be used in doc's table
  dispatch(buildDocumentStatuses(documents));

  //Pull window dimensions for responsive logic
  const { width } = useWindowDimensions();

  //UI State
  const [collapsed, setCollapsed] = useState(true);
  const [currentContent, setCurrentContent] = useState('documents');
  const [allDocumentsCompleted, setAllDocumentsCompleted] = useState(false);

  //Event Handlers
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onContentChange = ({ key }) => {
    setCurrentContent(key);

    if (key !== 'userInfo' && collapsed) {
      setCollapsed(false);
    }
  };

  const props = {
    currentContent,
    request,
  };

  useEffect(() => {
    setAllDocumentsCompleted(checkIfAllDocumentsAreSubmitted(documents));
  }, [documents]);

  return (
    <div className="homeContainer">
      <Layout style={{ minHeight: '90vh' }}>
        <Sider
          collapsible
          collapsed={width < 700 ? true : collapsed}
          onCollapse={toggleCollapse}
          collapsedWidth={60}
          width="10rem"
        >
          <div className="spacer" />

          {allDocumentsCompleted ? (
            <Menu
              theme="dark"
              defaultSelectedKeys={['userInfo']}
              mode="inline"
              inlineCollapsed={collapsed}
            >
              <Menu.Item
                key="userInfo"
                icon={<UserOutlined />}
                onClick={e => {
                  setCollapsed(true);
                  onContentChange(e);
                }}
              >
                User
              </Menu.Item>
              <Menu.Item
                key="documents"
                icon={<FileOutlined />}
                onClick={onContentChange}
              >
                Documents
              </Menu.Item>
              <Menu.Item
                key="comments"
                icon={<DesktopOutlined />}
                onClick={onContentChange}
              >
                Chat with us!
              </Menu.Item>
              <Menu.Item
                key="status"
                icon={<PieChartOutlined />}
                onClick={onContentChange}
              >
                Request Status
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              theme="dark"
              defaultSelectedKeys={['documents']}
              mode="inline"
              inlineCollapsed={collapsed}
            >
              <Menu.Item
                key="documents"
                icon={<FileOutlined />}
                onClick={onContentChange}
              >
                Documents
              </Menu.Item>
            </Menu>
          )}
        </Sider>
        <Layout className="sidebar-content-container">
          <Header className="header">
            <Title level={width > 490 ? 2 : 3} style={{ color: '#FFFFFF' }}>
              {currentUser.firstName}'s Housing Assistance Portal.
            </Title>
          </Header>
          <Content
            className="homeContent"
            style={{
              minHeight: 280,
            }}
          >
            {renderContent(props)}
          </Content>
          <Footer
            className="dashFooter"
            style={width < 1030 ? { height: '5rem' } : null}
          >
            <div className="footerItem">
              {/* eslint-disable-next-line */}
              <a href="http://www.familypromiseofspokane.org/" target="_blank">
                Powered by Family Promise of Spokane
              </a>
            </div>
            <div className="footerItem">
              <p>
                Need Technical Help? Email us at:{' '}
                <a href="mailto: hap@fpspokane.org">HAP@fpspokane.org</a>
              </p>
            </div>
            <div className="footerItem">
              <p>Questions about your request? Navigate to "Chat with us"</p>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

const renderContent = props => {
  switch (props.currentContent) {
    case 'status':
      return <StatusBar request={props.request} />;
    case 'comments':
      return <CommentsContainer request={props.request} />;
    case 'documents':
      return <Documents {...props} />;
    case 'userInfo':
      return <UserInfo />;
  }
};
