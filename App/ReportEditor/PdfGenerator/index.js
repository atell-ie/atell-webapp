import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import {
    Document,
    Font,
    Image,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
// import ReactPDF from "@react-pdf/renderer";
import List, { Item } from "./List";
import Table from "./Table";
import helper from "./helper";

import logoImg from "./optima_logo.png";

// TODO; after title paragram should have small padding, but after list paragraph should have 3x bigger padding

Font.register({
    family: "Lato",
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`
});

Font.register({
    family: "Lato Bold",
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`
});

Font.register({
    family: "Lato Italic",
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`
});

// Create styles
const pdfStyles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    section: {
        flexGrow: 1
    },
    pdfViewer: {
        width: "100%",
        height: "100%",
        border: 0
    },
    logo: {
        width: "150px",
        height: "150px",
        border: "1px solid #999"
    },
    title: {
        fontSize: 12,
        fontFamily: "Lato Bold",
        marginBottom: 6
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 6,
        fontFamily: "Lato"
    }
});

const placeholders = {
    clientName: "Test 1",
    assignmentType: "Test 2",
    date: "test 3"
};

const RenderItem = ({ item, idxKey }) => {
    const { element, value, isInitiated } = item;

    let parsedValue = value;
    if (element === "title" || element === "paragraph")
        parsedValue = helper.replacePlaceholders(parsedValue, placeholders);

    if (element == "title")
        return <Text style={pdfStyles.title}>{parsedValue}</Text>;
    if (element === "paragraph")
        return <Text style={pdfStyles.paragraph}>{parsedValue}</Text>;

    if (element === "list")
        return (
            <List>
                {value.map((detail, index) => (
                    <Item key={index} style={pdfStyles.row}>
                        {detail}
                    </Item>
                ))}
            </List>
        );

    if (element === "table" && isInitiated) return <Table data={value} />;
};

// Create Document Component
const ReportDocument = ({ content }) => (
    <PDFViewer style={pdfStyles.pdfViewer} showToolbar={true}>
        <Document>
            <Page key="main" size="A4" style={pdfStyles.page}>
                <View key="logo" style={{ ...pdfStyles.row, marginBottom: 12 }}>
                    <View style={pdfStyles.section}>
                        <Image src={logoImg} style={pdfStyles.logo} />
                    </View>
                    <View style={pdfStyles.section}>
                        <Text> </Text>
                    </View>
                </View>
                <View key="info" style={{ fontSize: 10, marginBottom: 36 }}>
                    <Text>Optima Speech Therapy</Text>
                    <Text>Wicklow House</Text>
                    <Text>Market Square</Text>
                    <Text>Wicklow Town, A67 W589</Text>
                    <Text> </Text>
                    <Text>Tel: 089 456 9 456</Text>
                    <Text>Email: hello@OptimaSpeechTherapy.com</Text>
                </View>
                <View
                    key="disc"
                    style={{
                        fontSize: 12,
                        textAlign: "center",
                        marginBottom: 48
                    }}
                >
                    <Text style={{ fontFamily: "Lato Bold" }}>
                        PRIVATE AND CONFIDENTIAL
                    </Text>
                    <Text style={{ fontFamily: "Lato Bold" }}>
                        SPEECH AND LANGUAGE THERAPY REPORT
                    </Text>
                    <Text>_____________________________________________</Text>
                    <Text style={{ fontFamily: "Lato Italic", margin: "8 0" }}>
                        This report is confidential and without predudice. It is
                        only for the information of the person to who it is
                        addressed. No responsibility can be taken if it is made
                        available to any other person. This report should not be
                        circulated or photocopied without the author's
                        permission. This report is not indented for medico-legal
                        purposes.
                    </Text>
                    <Text>_____________________________________________</Text>
                </View>

                <View key="about" style={{ fontSize: 14, textAlign: "left" }}>
                    <Text style={{ margin: "10 0" }}>Name: Alex</Text>
                    <Text style={{ margin: "10 0" }}>
                        Address: Long mile road 10, Across the Hills, Town city
                    </Text>
                    <Text style={{ margin: "10 0" }}>
                        Date of Birth: 15/02/2010
                    </Text>
                    <Text style={{ margin: "10 0" }}>
                        Date of Assessment: 25/07/2015
                    </Text>
                    <Text style={{ margin: "10 0" }}>
                        Date of Report: 25/09/2015
                    </Text>
                    <Text style={{ margin: "10 0" }}>
                        Therapist: Kate Beckett
                    </Text>
                </View>
            </Page>
            <Page key="report" size="A4" style={pdfStyles.page}>
                {Object.keys(content).map((key) => {
                    let section = content[key];
                    return section.map((item, index) => {
                        return <RenderItem key={index} item={item} />;
                    });
                })}
            </Page>
        </Document>
    </PDFViewer>
);

const PdfGenerator = () => {
    const { reportId, templateId } = useParams();
    const { reports, reportTemplates } = useSelector((state) => state);

    const isTemplate = templateId ? true : false;

    useEffect(() => {
        ReactDOM.render(
            <ReportDocument
                content={isTemplate ? reportTemplates.item : reports.item}
            />,
            document.getElementById("pdf-root")
        );
    }, [reportTemplates, reports.item]);

    return <div id="pdf-root" style={{ width: "100%", height: "100%" }}></div>;
};

export default PdfGenerator;
