# Правила для Claude в этом проекте

## Файлы Word, PowerPoint, PDF, Excel и другие документы

Когда пользователь присылает файл `.docx`, `.pptx`, `.pdf`, `.xlsx`, `.xls`, `.epub`, `.html`, `.csv`, `.zip` и подобные, **сначала** конвертируй его в Markdown через markitdown и читай результат:

```bash
markitdown путь/к/файлу.pptx > /tmp/файл.md
```

Если команды нет, установи её: `uv tool install 'markitdown[all]'` (или `pipx install 'markitdown[all]'`).
Если конвертация не удалась или потеряла важное (например, в PDF-скане нет текста или нужен макет), скажи об этом и прочитай файл напрямую.
