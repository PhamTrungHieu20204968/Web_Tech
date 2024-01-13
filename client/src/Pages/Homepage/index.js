import "./index.css";
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import JoditEditor from "jodit-react";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Button, message, Upload } from "antd";
import Blog from "../../Components/Blog/Blog";

const Homepage = () => {
  const loginWithGoogleHandler = () => {
    window.open("http://localhost:3001/users/google", "_self");
  };
  const logout = async () => {
    localStorage.removeItem("token");
    await axios.get(`${process.env.REACT_APP_BASE_URL}users/logout`);
  };
  const [title, setTitle] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  const [content, setContent] = useState();
  const [attachment, setAttachment] = useState();
  const [blogs, setBlogs] = useState([]);
  const [fileList, setFileList] = useState([]);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Nội dung",
    }),
    []
  );
  const props = {
    maxCount: 1,
    action: `${process.env.REACT_APP_BASE_URL}blogs/upload`,
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        setAttachment({
          type: info.file.type.includes("audio") ? "audio" : "img",
          content: info.file.name,
        });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
      }
    },
  };
  const createPost = () => {
    if (title.trim() === "" || content.trim() === "") return;
    let blog = {
      title: title.trim(),
      content: content,
    };
    if (attachment?.type === "img") blog.image = attachment?.content;
    else blog.audio = attachment?.content;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}blogs`, blog, {
        headers: {
          accessToken: user.accessToken,
        },
      })
      .then(() => {
        setTitle("");
        setContent("");
        setAttachment("");
        setFileList([]);
        setBlogs([]);
      });
  };
  useEffect(() => {
    const getToken = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}users/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else throw new Error("Đăng nhập thất bại!");
        })
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data));
          setUser(JSON.parse(localStorage.getItem("token")));
          Swal.fire({
            title: "Đăng nhập thành công",
            text: "Chào mừng đến với Blog",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!JSON.parse(localStorage.getItem("token"))) {
      getToken();
    }
  }, []);
  useEffect(() => {
    if (blogs.length === 0 || !blogs)
      axios.get(`${process.env.REACT_APP_BASE_URL}blogs`).then((response) => {
        setBlogs(response.data);
      });
  }, [blogs]);
  return (
    <div className="Homepage">
      <div className="header">
        <div className="sides">
          <a href="#" className="logo">
            BLOG
          </a>
        </div>
        <div className="sides">
          {!user && (
            <div onClick={loginWithGoogleHandler} className="menu">
              Login
            </div>
          )}
          {user && (
            <div onClick={logout} className="menu">
              Logout
            </div>
          )}
        </div>
        <div className="info">
          <h4>Công nghệ web và dịch vụ trực tuyến</h4>
          <div className="meta">
            <br />
            By{" "}
            <a href="https://twitter.com/nodws" target="_b">
              {user?.name}
            </a>{" "}
          </div>
        </div>
      </div>
      <div className="body">
        {user && (
          <div className="create-blog">
            <div className="create-blog-title">Tạo bài đăng</div>
            <Input
              value={title}
              placeholder="Tiêu đề"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <JoditEditor
              value={content}
              config={config}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
            <div className="create-blog-attachment">
              <Upload {...props} fileList={fileList}>
                <Button icon={<UploadOutlined />}>
                  Đính kèm ảnh hoặc file âm thanh
                </Button>
              </Upload>
              <div className="post">
                <Button type="primary" size="large" onClick={createPost}>
                  Đăng
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="blogs">
          {blogs.length !== 0 &&
            blogs.map((blog) => {
              return (
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs}></Blog>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
