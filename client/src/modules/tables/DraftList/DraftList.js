import React, { useState, useEffect } from 'react';
import './DraftList.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../redux/hooks/useTypeSelector.js';
import { getDrafts, getOneDraft } from '../../../redux/actions/draft/draft';
import { clearDisplay, setKeyL, setKeyR } from '../../../redux/actions/user/user';
const DraftList = () => {
    // state
    const dispatch = useDispatch();
    const draft = useTypedSelector((state) => state.draft);
    const user = useTypedSelector((state) => state.user);
    // const
    const userId = user.userId;
    const userDraftArray = draft.userDrafts;
    // useState
    const [list, setList] = useState(false);
    useEffect(() => {
        if (!list) {
            // get all drafts from user
            if (!userDraftArray[0]) {
                dispatch(getDrafts(userId));
            }
            setList(true);
        }
    }, [userDraftArray, userId, list]);
    // show one draft and disable pdf-download
    function showDraft(id) {
        dispatch(clearDisplay());
        dispatch(setKeyL('chatbox')); // for mobile/tablet navigation
        dispatch(setKeyR('about')); // for tablet navigation
        dispatch(getOneDraft(id));
    }
    // -------------------- return --------------------------------------------------
    // empty variable for return statement
    let drafts;
    return (React.createElement("div", { className: "table-drafts" },
        React.createElement("div", { className: "data-rows-drafts-1" },
            React.createElement("div", { className: "thead-drafts" }, "Your drafts"),
            React.createElement("div", { className: "thead-drafts" }, "Date")),
        React.createElement("div", { className: window.innerWidth <= 1000
                ? 'draftlist-scroll-mobile'
                : 'draftlist-scroll' }, (drafts = userDraftArray.map((draft) => {
            if (draft.language === user.language) {
                return (React.createElement("div", { key: uuidv4(), className: "data-rows-drafts-2", onClick: () => showDraft(draft._id) },
                    React.createElement("div", { className: "data-columns-drafts", id: "data-columns-drafts-title" },
                        React.createElement("span", { id: "draft-title" }, draft.title),
                        React.createElement("span", { id: "draft-published" }, draft.published ? ' (published)' : '')),
                    React.createElement("div", { className: "data-columns-drafts", id: "data-columns-draft-date" }, draft.date)));
            }
            return drafts;
        })))));
};
export default DraftList;
//# sourceMappingURL=DraftList.js.map