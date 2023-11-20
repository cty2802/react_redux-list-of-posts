import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
// import { Post } from './types/Post';
import { Counter } from './features/counter/Counter';
import { RootState } from './app/store';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  // const posts = useAppSelector((state: RootState) => {
  //   return state.posts;
  // });
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [selectedPost] = useState<Post | null>(null);

  const selectedUser = useAppSelector((state: RootState) => {
    return state.users.author;
  });
  // function loadUserPosts(userId: number) {
  //   setLoaded(false);

  //   getUserPosts(userId)
  //     .then(setPosts)
  //     .catch(() => setError(true))
  //     .finally(() => setLoaded(true));
  // }

  // useEffect(() => {
  //   setSelectedPost(null);

  //   if (selectedUser) {
  //     // loadUserPosts(selectedUser.id);
  //   } else {
  //     setPosts([]);
  //   }
  // }, [selectedUser?.id]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div
                className="block"
                data-cy="MainContent"
              >
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}
                {/*
                {!selectedUser
                && !loaded
                && ( */}
                {/* <Loader /> */}
                {/* )} */}

                {/* {selectedUser
                && loaded
                && hasError
                && ( */}
                {/* <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong!
                </div> */}
                {/* )} */}

                {/* {selectedUser
                && loaded
                && !hasError
                && posts?.length
                && ( */}
                {/* <div
                  className="notification is-warning"
                  data-cy="NoPostsYet"
                >
                  No posts yet
                </div> */}
                {/* )} */}

                {/* {selectedUser
                && loaded
                && !hasError
                && posts.length
                && ( */}
                <PostsList />
                {/* )} */}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              // {
              //   'Sidebar--open': selectedPost,
              // },
            )}
          >
            <div className="tile is-child box is-success ">
              {/* {selectedPost && ( */}
              <PostDetails />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
