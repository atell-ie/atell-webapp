import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

const reportsData = [
    {
        id: 1,
        name: "Aoife Hendricks"
    },
    {
        id: 2,
        name: "Paul Rogers"
    }
];

// reportData => section => breakdown (title, paragraph, table, list etc)

const reportData = {
    reasonForReport: [
        {
            value: "Reason for Report",
            element: "title"
        },
        {
            value: "The reason for this report is to outline the results of Alex's most recent Speech and Language Asssessment. The outcome of the assessments indicates that Alex Presents with Speech and Language skills which are Within Normal Limits (W.N.L) for his age. Alex presents with mild grammatical errors and some Speech Sound difficulties which will be further outlined below.",
            element: "paragraph"
        },
        {
            value: ["First entry", "Second entry"],
            element: "list"
        },
        {
            value: [
                ["test for a long string", "test2", "324234", "4444"],
                ["test3", "test4 for a long string", "324234", "4444"]
            ],
            isInitiated: true,
            element: "table"
        }
    ],
    background: [
        {
            value: "Background",
            element: "title"
        },
        {
            value: "Speech assessment, also known as speech evaluation or speech therapy assessment, is the process of evaluating an individual's speech and language abilities in order to diagnose and treat any communication disorders. The assessment typically includes a thorough examination of the individual's speech, language, and voice, as well as an evaluation of their cognitive and social communication skills. The assessment may be conducted by a speech-language pathologist (SLP) and may include a variety of tools and techniques such as observation, standardized tests, and listening to recorded speech samples. The information gathered during the assessment is used to develop a treatment plan and set goals for therapy.",
            element: "paragraph"
        },
        {
            value: "Language therapy, also known as speech therapy, is the process of helping individuals with language and communication disorders. It is typically provided by a speech-language pathologist (SLP) and is used to help individuals with a wide range of conditions including:",
            element: "paragraph"
        },
        {
            value: [
                "Speech disorders, such as difficulty pronouncing certain sounds or words",
                "Language disorders, such as difficulty understanding or expressing language",
                "Cognitive-communication disorders, such as difficulty with attention, memory, or problem-solving that affects communication",
                "Social communication disorders, such as difficulty with social interactions and understanding nonverbal cues."
            ],
            element: "list"
        }
    ],
    "speech-ang-language": [
        {
            value: "Speech and Language Assessment",
            element: "title"
        },
        {
            value: "Language therapy often includes a combination of exercises, activities, and strategies to help individuals improve their language and communication skills. These may include:",
            element: "paragraph"
        },
        {
            value: [
                "Articulation therapy to help improve the clarity of speech sounds",
                "Language therapy to help improve vocabulary, grammar, and sentence structuree",
                "Pragmatic therapy to help improve social communication skills",
                "Augmentative and alternative communication (AAC) to help individuals who have difficulty speaking find other ways to communicate",
                "Family and caregiver education to help support the individual's progress and carryover of skills learned in therapy."
            ],
            element: "list"
        },
        {
            value: "Language therapy is often tailored to the specific needs of the individual and may be provided in a one-on-one or group setting. The length and frequency of therapy will vary depending on the individual's needs and progress.",
            element: "paragraph"
        }
    ],
    "informal-assessment": [
        {
            value: "Informal Assessment",
            element: "title"
        },
        {
            value: "Informal assessment, also known as dynamic assessment, is a type of assessment that is used to evaluate an individual's abilities in a more natural and less structured setting. It is different from formal assessment, which typically uses standardized tests and procedures. Informal assessment is often used in language therapy and speech therapy to evaluate an individual's language and communication skills. Some examples of informal assessment techniques that a speech-language pathologist might use include:",
            element: "paragraph"
        }
    ],
    "parent-report": [
        {
            value: "Parent report",
            element: "title"
        },
        {
            value: "Parent report is a type of informal assessment where parents or caregivers provide information about a child's language and communication skills. It is often used in conjunction with other forms of assessment, such as observation and standardized testing, to gain a comprehensive understanding of the child's abilities.",
            element: "paragraph"
        }
    ],
    "language-skills": [
        {
            value: "Language skills",
            element: "title"
        },
        {
            value: "Language skills refer to the ability to understand and use language effectively. These skills include:",
            element: "paragraph"
        }
    ]
};

function* getReports(action) {
    // const {  } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.reports}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getReportsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getReportsFailure(error.toString()));
    }
}

function* postReport(action) {
    const { report } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.reports}/`;
    try {
        const { data } = yield call(http.authorized.post, url, report);

        yield put(actionCreators.postReportSuccess(data));
    } catch (error) {
        yield put(actionCreators.postReportFailure(error.toString()));
    }
}

function* getReportData(action) {
    const { reportId } = action.payload;

    const url = `${config.api.baseUrl}${config.api.urls.reports}/${reportId}/report-data/`;
    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getReportDataSuccess(data));
    } catch (error) {
        yield put(actionCreators.getReportDataFailure(error.toString()));
    }
}

function* postReportData(action) {
    const { reportId, reportData } = action.payload;

    const url = `${config.api.baseUrl}${config.api.urls.reports}/${reportId}/report-data/`;
    try {
        const { data } = yield call(http.authorized.post, url, reportData);

        yield put(actionCreators.postReportDataSuccess(data));
    } catch (error) {
        yield put(actionCreators.postReportDataFailure(error.toString()));
    }
}

function* putReportData(action) {
    const { reportId, reportData } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.reports}/${reportId}/report-data/`;
    try {
        const { data } = yield call(http.authorized.put, url, {
            report_data: reportData
        });

        yield put(actionCreators.putReportDataSuccess(data));
    } catch (error) {
        yield put(actionCreators.putReportDataFailure(error.toString()));
    }
}

function* deleteReport(action) {
    const { reportId } = action.payload;

    const url = `${config.api.baseUrl}${config.api.urls.reports}/${reportId}/`;
    try {
        const { data } = yield call(http.authorized.delete, url);

        yield put(actionCreators.deleteReportSuccess(reportId));
    } catch (error) {
        yield put(actionCreators.deleteReportFailure(error.toString()));
    }
}

export default (function* () {
    yield all([
        takeLatest(actionTypes.GET_REPORTS, getReports),
        takeLatest(actionTypes.POST_REPORT, postReport),
        takeLatest(actionTypes.GET_REPORT_DATA, getReportData),
        takeLatest(actionTypes.POST_REPORT_DATA, postReportData),
        takeLatest(actionTypes.PUT_REPORT_DATA, putReportData),
        takeLatest(actionTypes.DELETE_REPORT, deleteReport)
    ]);
})();
