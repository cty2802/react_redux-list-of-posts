import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Counter } from './features/counter/Counter';
import { RootState } from './app/store';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  const selectedUser = useAppSelector((state: RootState) => {
    return state.author.author;
  });

  const selectedPost = useAppSelector((state: RootState) => {
    return state.posts.selectedPost;
  });

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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
