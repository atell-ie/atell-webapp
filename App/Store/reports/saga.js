import { all, put, takeLatest } from "redux-saga/effects";
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

function* getRequest(action) {
    // const {  } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getRequestSuccess(reportsData));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* getReportRequest(action) {
    const { taskId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getReportRequestSuccess(reportData));
    } catch (error) {
        yield put(actionCreators.getReportRequestFailure(error.toString()));
    }
}

function* postReportRequest(action) {
    const { reportData } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        const newReport = {
            id: 40,
            clientId: 1,
            source: 2
        };

        yield put(actionCreators.postReportSuccess(newReport));
    } catch (error) {
        yield put(actionCreators.postReportFailure(error.toString()));
    }
}

function* putReportRequest(action) {
    const { reportId, newReport } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.putReportSuccess(newReport));
    } catch (error) {
        yield put(actionCreators.putReportFailure(error.toString()));
    }
}

function* deleteReportRequest(action) {
    const { taskId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.deleteReportSuccess(reportData));
    } catch (error) {
        yield put(actionCreators.deleteReportFailure(error.toString()));
    }
}

export {
    getRequest,
    getReportRequest,
    postReportRequest,
    putReportRequest,
    deleteReportRequest
};

export default (function* () {
    yield all([
        takeLatest(actionTypes.REPORTS_REQUEST, getRequest),
        takeLatest(actionTypes.REPORT_REQUEST, getReportRequest),
        takeLatest(actionTypes.POST_REPORT_REQUEST, postReportRequest),
        takeLatest(actionTypes.PUT_REPORT_REQUEST, putReportRequest),
        takeLatest(actionTypes.DELETE_REPORT_REQUEST, deleteReportRequest)
    ]);
})();
