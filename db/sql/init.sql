-- todosテーブルの作成
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,               -- タスクの一意な識別子
    title VARCHAR(255) NOT NULL,         -- タスクのタイトル
    is_completed BOOLEAN DEFAULT FALSE,  -- タスクが完了したかどうかのフラグ
    due_date TIMESTAMP,                  -- タスクの期限日
    created_at TIMESTAMP DEFAULT NOW(),  -- タスクの作成日時
    updated_at TIMESTAMP DEFAULT NOW(),  -- タスクの更新日時
    deleted_at TIMESTAMP DEFAULT NULL   -- タスクの削除日時
);

-- todosテーブルのdue_dateカラムにインデックスを追加
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON todos(due_date);

-- todosテーブルのis_completedカラムにインデックスを追加
CREATE INDEX IF NOT EXISTS idx_todos_is_completed ON todos(is_completed);

-- データがある場合の初期データの挿入
INSERT INTO todos (title, is_completed, due_date) VALUES ('初めてのタスク', FALSE, '2024-12-31');
