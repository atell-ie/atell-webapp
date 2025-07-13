import { pdf } from "@react-pdf/renderer";
import React from "react";
import {
    Document,
    Font,
    Image,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";

// Import components from the existing PdfGenerator
import List, { Item } from "../../ReportEditor/PdfGenerator/List";
import Table from "../../ReportEditor/PdfGenerator/Table";
import helper from "../../ReportEditor/PdfGenerator/helper";
import logoImg from "../../ReportEditor/PdfGenerator/optima_logo.png";

// Register fonts (same as PdfGenerator)
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

// Create styles (same as PdfGenerator)
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

const RenderItem = ({ item }) => {
    const { element, value, isInitiated } = item;

    let parsedValue = value;
    if (element === "title" || element === "paragraph")
        parsedValue = helper.replacePlaceholders(parsedValue, placeholders);

    if (element === "title")
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

    return null;
};

// Helper function to validate section data
const isValidSectionData = (sectionData) => {
    return (
        Array.isArray(sectionData) &&
        sectionData.every(
            (item) =>
                item &&
                typeof item === "object" &&
                "element" in item &&
                "value" in item
        )
    );
};

// Create PDF Document Component (without PDFViewer)
const ExportDocument = ({ content, reportTitle }) => {
    // Check if content is valid
    if (!content || typeof content !== "object" || Array.isArray(content)) {
        return (
            <Document>
                <Page size="A4" style={pdfStyles.page}>
                    <View style={{ textAlign: "center", marginTop: 100 }}>
                        <Text style={pdfStyles.title}>
                            Report Cannot Be Exported
                        </Text>
                        <Text style={pdfStyles.paragraph}>
                            The report data is corrupted and cannot be exported.
                        </Text>
                    </View>
                </Page>
            </Document>
        );
    }

    // Filter out corrupted sections
    const validSections = Object.keys(content).filter((key) =>
        isValidSectionData(content[key])
    );

    const hasCorruptedSections =
        Object.keys(content).length > validSections.length;

    return (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                <View style={{ ...pdfStyles.row, marginBottom: 12 }}>
                    <View style={pdfStyles.section}>
                        <Image src={logoImg} style={pdfStyles.logo} />
                    </View>
                    <View style={pdfStyles.section}>
                        <Text> </Text>
                    </View>
                </View>
                <View style={{ fontSize: 10, marginBottom: 36 }}>
                    <Text>Optima Speech Therapy</Text>
                    <Text>Wicklow House</Text>
                    <Text>Market Square</Text>
                    <Text>Wicklow Town, A67 W589</Text>
                    <Text> </Text>
                    <Text>Tel: 089 456 9 456</Text>
                    <Text>Email: hello@OptimaSpeechTherapy.com</Text>
                </View>
                <View
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
            </Page>

            <Page size="A4" style={pdfStyles.page}>
                {hasCorruptedSections && (
                    <View
                        style={{
                            marginBottom: 20,
                            padding: 10,
                            backgroundColor: "#ffe6e6"
                        }}
                    >
                        <Text style={{ ...pdfStyles.title, color: "#d32f2f" }}>
                            Warning: Some sections were skipped due to data
                            corruption
                        </Text>
                        <Text
                            style={{ ...pdfStyles.paragraph, color: "#d32f2f" }}
                        >
                            Please fix the corrupted sections for a complete
                            report.
                        </Text>
                    </View>
                )}
                {validSections.length === 0 ? (
                    <View style={{ textAlign: "center", marginTop: 50 }}>
                        <Text style={pdfStyles.title}>
                            No Valid Content to Display
                        </Text>
                        <Text style={pdfStyles.paragraph}>
                            All sections contain corrupted data.
                        </Text>
                    </View>
                ) : (
                    validSections.map((key) => {
                        let section = content[key];
                        return section.map((item, index) => (
                            <RenderItem key={`${key}-${index}`} item={item} />
                        ));
                    })
                )}
            </Page>
        </Document>
    );
};

// Export function
export const exportReportToPDF = async (reportData, reportTitle = "Report") => {
    try {
        // Create the PDF document
        const doc = (
            <ExportDocument content={reportData} reportTitle={reportTitle} />
        );

        // Generate PDF blob
        const asPdf = pdf(doc);
        const blob = await asPdf.toBlob();

        // Create filename with timestamp
        const timestamp = new Date().toISOString().split("T")[0];
        const filename = `${reportTitle.replace(
            /[^a-zA-Z0-9]/g,
            "_"
        )}_${timestamp}.pdf`;

        // Save the file using browser's built-in download
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return { success: true, filename };
    } catch (error) {
        console.error("PDF export error:", error);
        return { success: false, error: error.message };
    }
};

export default exportReportToPDF;
