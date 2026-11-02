ALTER TABLE post_comments
  ADD COLUMN parent_comment_id INT UNSIGNED NULL,
  ADD INDEX idx_post_comments_parent_comment_id (parent_comment_id),
  ADD CONSTRAINT fk_post_comments_parent
    FOREIGN KEY (parent_comment_id)
    REFERENCES post_comments (id)
    ON DELETE CASCADE;
