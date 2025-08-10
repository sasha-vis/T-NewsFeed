import { Card, Tag, Typography, Space } from "antd";
import { LikeOutlined, DislikeOutlined, EyeOutlined } from "@ant-design/icons";
import { type Post } from "./types";

const { Title, Paragraph } = Typography;

interface NewsCardProps {
  post: Post;
}

export const NewsCard = ({ post }: NewsCardProps) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Title level={4}>{post.title}</Title>
      <Paragraph
        ellipsis={{ rows: 3, expandable: true }}
        style={{ marginBottom: 16 }}
      >
        {post.body}
      </Paragraph>
      <div style={{ marginBottom: 8 }}>
        {post.tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </div>
      <Space size="middle">
        <span>
          <LikeOutlined style={{ marginRight: 4 }} />
          {post.reactions.likes}
        </span>
        <span>
          <DislikeOutlined style={{ marginRight: 4 }} />
          {post.reactions.dislikes}
        </span>
        <span>
          <EyeOutlined style={{ marginRight: 4 }} />
          {post.views}
        </span>
      </Space>
    </Card>
  );
};
