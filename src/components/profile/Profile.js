// React
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// Contexts
import { PostContext } from "../../contexts/PostContext";

// Services
import UserService from "../../services/UserService";

// Styling
import "./Profile.css";
import { Card, Container, Row, Col, Dropdown, Image } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

// Images
import Post from "../post/Post";
import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { posts, fetchPostsByAuthorId } = useContext(PostContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUserById(id);
        console.log("getUserById: ", userData);
        setProfile(userData);
      } catch (error) {
        console.error("Failed to fetch user by ID: ", error);
      }
    };

    fetchUser();
    fetchPostsByAuthorId(id);
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    profile && (
      <Container className="mt-5">
        <Row>
          <Col lg={12} className="mx-auto">
            <Card className="text-center bg-dark text-white p-3">
              <Image
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${profile.avatar}`}
                roundedCircle
                width="150"
                height="150"
                className="avatar m-auto"
              />
              <Card.Body>
                <Card.Title>{profile.email}</Card.Title>
                <Card.Text>
                  {profile.bio ? profile.bio : "No bio at this time"}
                </Card.Text>
                <Card.Text>
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </Card.Text>
                {user && profile && user.id === profile.id && (
                  <div className="profile-dropdown">
                    <Dropdown>
                      <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        <ThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-dark">
                        <Dropdown.Item href="/update-password">
                          Update Password
                        </Dropdown.Item>
                        <Dropdown.Item href="/update-profile">
                          Edit Profile
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="mb-5">
            {posts &&
              posts.map((post, index) => <Post key={index} postData={post} />)}
          </Col>
        </Row>
      </Container>
    )
  );
}

export default Profile;
