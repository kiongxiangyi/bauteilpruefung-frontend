import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import Checkbox from '../../components/UI/Checbox';
import { Textarea, CheckboxContainer } from './StyledComponents';
import toast from 'react-hot-toast';

const CommentComponent = ({
  isKommentarButtonActive,
  setIsKommentarButtonActive,
  totalPointsOnGraph,
  commentID,
}) => {
  // State and functions for handling comments
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [werkzeugbruchChecked, setWerkzeugbruchChecked] = useState(false);
  const [geraeuscheChecked, setGeraeuscheChecked] = useState(false);
  const [spanproblemeChecked, setSpanproblemeChecked] = useState(false);
  const [sonstigeChecked, setSonstigeChecked] = useState(false);
  const [keineAuffaelligkeitenChecked, setKeineAuffaelligkeitenChecked] =
    useState(false);

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSaveComment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/AicomEreignisse`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalPointsOnGraph: totalPointsOnGraph,
            commentID: commentID,
            comment: comment, // Include the comment data
            werkzeugbruchChecked: werkzeugbruchChecked,
            geraeuscheChecked: geraeuscheChecked,
            spanproblemeChecked: spanproblemeChecked,
            sonstigeChecked: sonstigeChecked,
            keineAuffaelligkeitenChecked: keineAuffaelligkeitenChecked,
          }),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to update comment. Status: ${response.status}`);
      }

      // Reset the comment and hide the comment box after a successful update and deactivate the button
      setComment('');
      setShowCommentBox(false);
      setIsKommentarButtonActive(false);

      // Display success toast
      toast.success(`Kommentar gespeichert!`, {
        duration: 3000,
      });
    } catch (error) {
      // Handle errors, e.g., display an error toast
      console.error('Error updating comment:', error);
      toast.error('Fehler beim Speichern des Kommentars');
    }
  };

  return (
    <>
      {showCommentBox ? (
        <>
          <CheckboxContainer>
            {/* Checkbox */}
            <Checkbox
              id="Werkzeugbruch"
              label="Werkzeugbruch"
              checked={werkzeugbruchChecked}
              onChange={(e) => setWerkzeugbruchChecked(e.target.checked)}
            />
            <Checkbox
              id="Geräusche"
              label="Geräusche"
              checked={geraeuscheChecked}
              onChange={(e) => setGeraeuscheChecked(e.target.checked)}
            />
            <Checkbox
              id="Spanprobleme"
              label="Spanprobleme"
              checked={spanproblemeChecked}
              onChange={(e) => setSpanproblemeChecked(e.target.checked)}
            />
            <Checkbox
              id="Sonstige"
              label="Sonstige"
              checked={sonstigeChecked}
              onChange={(e) => setSonstigeChecked(e.target.checked)}
            />
            <Checkbox
              id="Keine Auffälligkeiten"
              label="Keine Auffälligkeiten"
              checked={keineAuffaelligkeitenChecked}
              onChange={(e) =>
                setKeineAuffaelligkeitenChecked(e.target.checked)
              }
            />
          </CheckboxContainer>
          {/* Comment Input Box */}
          <Textarea
            rows={4}
            cols={20}
            placeholder="Geben Sie Ihren Kommentar hier ein."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
          <Button
            size="small"
            onClick={handleSaveComment}
            disabled={!isKommentarButtonActive}
          >
            Speichern
          </Button>
        </>
      ) : (
        <Button
          size="small"
          onClick={handleCommentClick}
          disabled={!isKommentarButtonActive}
        >
          Beobachtung
        </Button>
      )}
    </>
  );
};

export default CommentComponent;
