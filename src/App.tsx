import { Provider } from "react-redux";
import { store } from "./app/store";
import { Layout } from "antd";
import { NewsFeed } from "./features/newsFeed/NewsFeed";

const { Header, Content } = Layout;

export const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{ color: "white", fontSize: "24px" }}>
          News Feed App
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 24 }}>
          <NewsFeed />
        </Content>
      </Layout>
    </Provider>
  );
};
