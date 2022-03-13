import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link, } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';
const styles = StyleSheet.create({
    page: {
        backgroundColor: 'lightgrey',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: { fontSize: 8, marginBottom: 20, textAlign: 'center' },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
    author: { fontSize: 10, marginTop: 5, color: 'grey' },
    date: { fontSize: 8, marginTop: 5, color: 'grey' },
    philosopher: { fontSize: 10, marginTop: 5, marginBottom: 5 },
    text: { fontSize: 15, marginBottom: 10, marginLeft: 10 },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});
// Create PDF document
const PDF = (props) => {
    let key;
    let philosopher;
    let text;
    return (React.createElement(Document, null,
        React.createElement(Page, { size: "A4", style: styles.page },
            React.createElement(Text, { style: styles.header, fixed: true },
                React.createElement(Link, { src: 'http://chat-editor.herokuapp.com' },
                    ' ',
                    "~ chat-editor.herokuapp.com ~",
                    ' ')),
            React.createElement(View, { style: styles.title },
                React.createElement(Text, null, props.title),
                React.createElement(Text, { style: styles.author },
                    "written by ",
                    props.author),
                React.createElement(Text, { style: styles.date }, props.date)),
            props.data.map((d) => {
                philosopher = d.name;
                text = d.text;
                key = uuidv4();
                return (React.createElement(View, { key: key, wrap: false },
                    React.createElement(Text, { style: styles.philosopher },
                        philosopher,
                        ":"),
                    React.createElement(Text, { style: styles.text }, text)));
            }),
            React.createElement(Text, { style: styles.pageNumber, render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`, fixed: true }))));
};
export default PDF;
//# sourceMappingURL=PDF.js.map