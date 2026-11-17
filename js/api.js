// develop by @rogalvaom
function getUrlParameters() {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    if (!queryString) return {};

    const params = queryString.split('&');
    const result = {};

    params.forEach(param => {
        const [key, value] = param.split('=');
        result[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return result;
}

function getFormData(form) {
    const formData = new FormData(form);
    const jsonData = {};
    const arrayFields = new Set();

    for (let element of form.elements) {
        if (element.name && element.name.endsWith('[]')) {
            arrayFields.add(element.name);
        }
    }

    arrayFields.forEach(name => {
        jsonData[name] = [];
    });

    formData.forEach((value, key) => {
        const trimmed = value.trim();

        if (arrayFields.has(key)) {
            if (trimmed !== '') {
                jsonData[key].push(trimmed);
            }
        } else {
            jsonData[key] = trimmed !== '' ? trimmed : null;
        }
    });

    return jsonData;
}

function apiRequest(method, url, data = null) {
    let responseData = null;
    let requestData = data;
    let requestHeaders = {};
    let processData = true;
    let contentType = undefined;

    if (data instanceof FormData) {
        requestHeaders = {};
        processData = false;
        contentType = false;
    } else if (data !== null) {
        requestData = data;
        requestHeaders = {};
        processData = true;
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    if (window.atnApiToken) {
        requestHeaders.Authorization = `Bearer ${window.atnApiToken}`;
    }

    $.ajax({
        method: method,
        url: ((typeof ENV !== 'undefined' && ENV.API_URL) || '') + '/api' + url,
        data: requestData,
        headers: requestHeaders,
        xhrFields: {
            withCredentials: true
        },
        processData: processData,
        contentType: contentType,
        async: false,
        complete: function(response) {
            try {
                responseData = JSON.parse(response.responseText);
            } catch (e) {
                responseData = response.responseText;
            }
        }
    });

    return responseData;
}

window.apiGet = (url, data) => apiRequest('GET', url, data);
window.apiPost = (url, data) => apiRequest('POST', url, data);
window.apiPut = (url, data) => apiRequest('PUT', url, data);
window.apiDelete = (url, data) => apiRequest('DELETE', url, data);

function getApiAuthHeaders() {
    return window.atnApiToken
        ? { Authorization: `Bearer ${window.atnApiToken}` }
        : {};
}

window.apiGetAsync = async (url) => {
    const apiUrl = ((typeof ENV !== 'undefined' && ENV.API_URL) || '') + '/api' + url;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
            headers: getApiAuthHeaders(),
            signal: controller.signal
        });
        const responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch {
            return responseText;
        }
    } finally {
        clearTimeout(timeout);
    }
};
