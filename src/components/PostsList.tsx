import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import * as postsActions from '../features/secondApp/postsSlice';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state: RootState) => {
    return state.author.author?.id;
  });

  const selectedPostId = useAppSelector((state: RootState) => {
    return state.posts.selectedPost?.id;
  });

  useEffect(() => {
    dispatch(postsActions.loadPostsByUser(userId));
  }, [userId, dispatch]);

  const posts = useAppSelector((state: RootState) => {
    return state.posts.posts;
  });

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th aria-label="th"> </th>
          </tr>
        </thead>

        <tbody>
          {posts?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    {
                      'is-light': post.id !== selectedPostId,
                    },
                  )}
                  onClick={() => {
                    dispatch(postsActions
                      .setSelectedPost(post));
                  }}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
