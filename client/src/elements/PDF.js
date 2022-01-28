import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid'

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
})

// Create PDF document
const PDF = (props) => {
  let key
  let philosopher
  let text

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          <Link src={'http://flokrates-online.herokuapp.com'}>
            {' '}
            ~ flokrates-online.herokuapp.com ~{' '}
          </Link>
        </Text>

        <View style={styles.title}>
          <Text>{props.title}</Text>
          <Text style={styles.author}>written by {props.author}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>

        {props.data.map((d) => {
          philosopher = d.name
          text = d.text
          key = uuidv4()

          return (
            <View key={key} wrap={false}>
              <Text style={styles.philosopher}>{philosopher}:</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
          )
        })}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default PDF
