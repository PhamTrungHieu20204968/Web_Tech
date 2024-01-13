import { useState } from "react";
import axios from "axios";
import { Input, Modal } from "antd";
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Blog.css";

const Blog = ({ blog, setBlogs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [comment, setComment] = useState();
  return (
    <div className="blog">
      <div className="name-avatar">
        <div className="avatar">
          <img src={blog.user?.avatar} alt="avatar"></img>
        </div>
        <div className="name">{blog.user.name}</div>
      </div>
      <div className="blog-title">{blog.title}</div>
      <div className="blog-content">
        <p dangerouslySetInnerHTML={{ __html: blog.content }}></p>
        <div className="attachment">
          {blog.audio && (
            <div className="audio">
              <audio controls>
                <source
                  src={require(`../../audio/${blog.audio}`)}
                  type="audio/mpeg"
                />
              </audio>
            </div>
          )}
          {blog.image && (
            <div className="image">
              <img src={require(`../../img/${blog.image}`)} alt="Ảnh" />
            </div>
          )}
        </div>
      </div>
      <div className="comment-section">
        <span className="comment-size" onClick={showModal}>
          {blog.comments.length} bình luận
        </span>
      </div>
      <Modal
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="comments">
          {blog.comments.length !== 0 &&
            blog.comments.map((comment) => {
              return (
                <div className="comment">
                  <img src={comment.user.avatar} alt="avatar" />
                  <div className="comment-body">
                    <div className="comment-username">{comment.user.name}</div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                  {blog.user.name === user.name && (
                    <DeleteOutlined
                      onClick={() => {
                        axios
                          .delete(
                            `${process.env.REACT_APP_BASE_URL}comments/${comment.id}`
                          )
                          .then(() => {
                            setBlogs([]);
                          });
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
        {user && (
          <div className="your-comment">
            <img src={user.avatar} alt="avatar" />
            <Input
              suffix={<SendOutlined />}
              value={comment}
              placeholder="Bình luận"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onPressEnter={() => {
                if (comment.trim() !== "") {
                  axios
                    .post(
                      `${process.env.REACT_APP_BASE_URL}comments`,
                      {
                        content: comment,
                        blogId: blog.id,
                      },
                      {
                        headers: {
                          accessToken: user.accessToken,
                        },
                      }
                    )
                    .then((response) => {
                      setComment("");
                      setBlogs([]);
                    });
                }
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Blog;
