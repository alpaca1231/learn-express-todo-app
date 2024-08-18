-- tasksテーブルの作成
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,               -- タスクの一意な識別子
    title VARCHAR(255) NOT NULL,         -- タスクのタイトル
    is_completed BOOLEAN DEFAULT FALSE,  -- タスクが完了したかどうかのフラグ
    due_date TIMESTAMP,                  -- タスクの期限日
    created_at TIMESTAMP DEFAULT NOW(),  -- タスクの作成日時
    updated_at TIMESTAMP DEFAULT NOW(),  -- タスクの更新日時
    deleted_at TIMESTAMP DEFAULT NULL   -- タスクの削除日時
);

-- tasksテーブルのdue_dateカラムにインデックスを追加
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

-- tasksテーブルのis_completedカラムにインデックスを追加
CREATE INDEX IF NOT EXISTS idx_tasks_is_completed ON tasks(is_completed);

-- データがある場合の初期データの挿入
INSERT INTO tasks (title, is_completed, due_date) VALUES ('初めてのタスク', FALSE, '2024-12-31');
