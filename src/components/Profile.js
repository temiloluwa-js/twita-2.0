import React from "react";
import useFetch from "../useFetch";
import styles from "../styles/Profile.module.css";
import { Link } from "react-router-dom";
import backbutton from '../images/back-button.png'

const Profile = () => {
  const person = JSON.parse(localStorage.getItem("personInStorage"));
  const { data: posts, error: postsError } = useFetch(
    "http://localhost:3010/posts"
  );

  return (
    <div className={styles.profile}>
      <div className={styles.topbar}>
        <Link to="/">
          <img src={backbutton} alt="Go back" />
        </Link>
      </div>
      <section className={styles.top_section}>
        <div className={styles.dp}>
          <img src={person.dpUrl} alt={person.firstName} />
        </div>
        <div className={styles.person_details}>
          <h2>
            {person.firstName} {person.lastName}
          </h2>
          <p>{person.username}</p>
          <p>{person.dateOfBirth}</p>
        </div>
      </section>
      <main className={styles.postlist}>
        {postsError && <h2>{postsError}</h2>}
        {posts &&
          posts
            .filter((post) => post.creator == person.username)
            .map((post) => (
              <article key={post.id} className={styles.post}>
                <div className={styles.post_header}>
                  <img src={post.creatorDp} width="150px" />
                  <div>
                    <h2>
                      {post.creatorFirstName} {post.creatorLastName}
                    </h2>
                    <p>@{post.creator}</p>
                  </div>
                </div>
                <Link to={`/posts/${post.id}`} className={styles.post_content}>
                  <div>
                    <h2>{post.postContent}</h2>
                    <p>{post.dateCreated}</p>
                  </div>
                </Link>
                <div className={styles.post_footer}>
                  <p>Like</p>
                  <p>Comment</p>
                  <p>Share</p>
                </div>
              </article>
            ))}
      </main>
    </div>
  );
};

export default Profile;
