import React, { useState } from 'react';
import { BookOpen, Search, Plus, Trash2, Edit, Calendar, Link } from 'lucide-react';
import { StrategyNote, Strategy } from '../types';

interface NotesSectionProps {
  notes: StrategyNote[];
  strategies: Strategy[];
  onAddNote: (note: Omit<StrategyNote, 'id' | 'updatedAt'>) => void;
  onEditNote: (id: string, updates: Partial<StrategyNote>) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  strategies,
  onAddNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [strategyId, setStrategyId] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const selectedStrategy = strategies.find((s) => s.id === strategyId);
    const strategyName = selectedStrategy ? selectedStrategy.name : 'General Note';

    if (editingId) {
      onEditNote(editingId, {
        title,
        content,
        strategyId,
        strategyName,
      });
      setEditingId(null);
    } else {
      onAddNote({
        title,
        content,
        strategyId,
        strategyName,
      });
    }

    // Reset Form
    setTitle('');
    setContent('');
    setStrategyId('general');
    setShowForm(false);
  };

  const handleEditClick = (note: StrategyNote) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setStrategyId(note.strategyId);
    setShowForm(true);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.strategyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header Panel */}
      <div className="flex justify-between items-center bg-slate-950 p-1 rounded-xl border border-slate-900">
        <div className="flex items-center gap-1.5 pl-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-200">Study Notebook</span>
        </div>
        <button
          id="btn-new-note"
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setContent('');
            setStrategyId('general');
            setShowForm(true);
          }}
          className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          Create Note
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1.5">
            {editingId ? 'Edit Study Note' : 'Create New Study Note'}
          </h4>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Note Title</label>
            <input
              id="input-note-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Learnings from ORB Strategy"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Link to Strategy or Category</label>
            <select
              id="select-note-link"
              value={strategyId}
              onChange={(e) => setStrategyId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="general">General (Unlinked)</option>
              {strategies.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Notes Content</label>
            <textarea
              id="input-note-content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write down your technical rules, checklists, observation records, or mistakes here..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              id="btn-note-cancel"
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              id="btn-note-submit"
              type="submit"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs"
            >
              {editingId ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      )}

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
        <input
          id="input-search-notes"
          type="text"
          placeholder="Search note titles or contents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Notes Grid */}
      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-2 hover:border-slate-700 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-slate-200">{note.title}</h4>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{note.updatedAt}</span>
                  {note.strategyId !== 'general' && (
                    <span className="flex items-center gap-0.5 text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded font-mono">
                      <Link className="w-2.5 h-2.5" />
                      {note.strategyName}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  id={`btn-edit-note-${note.id}`}
                  onClick={() => handleEditClick(note)}
                  className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-950 transition"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  id={`btn-delete-note-${note.id}`}
                  onClick={() => onDeleteNote(note.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-950 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap mt-1">
              {note.content}
            </p>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="bg-slate-900 border border-slate-800/50 rounded-2xl p-8 text-center text-xs text-slate-500">
            No notes found. Keep study logs here to retain key trading structures!
          </div>
        )}
      </div>
    </div>
  );
};
