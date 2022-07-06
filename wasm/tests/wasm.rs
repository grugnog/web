extern crate serde;
extern crate a11ywatch_web_wasm;

use wasm_bindgen_test::*;
use wasm_bindgen::JsValue;
use a11ywatch_web_wasm::structures::website::{PageIssue};
use a11ywatch_web_wasm::Feed;

#[wasm_bindgen_test]
fn insert_website() {
    let mut feed = Feed::new();
    let value = JsValue::from_serde(&serde_json::json!({
        "pageUrl": "https://a11ywatch.com/login",
        "domain": "a11ywatch.com",
        "issues": []
    })).unwrap();

    let value1 = JsValue::from_serde(&serde_json::json!({
        "pageUrl": "https://jeffmendez.com/login",
        "domain": "jeffmendez.com",
        "issues": []
    })).unwrap();

    feed.insert_website(value.clone());
    feed.insert_website(value1.clone());

    let website = feed.get_website(value);
    let website: PageIssue = JsValue::into_serde(&website).unwrap();
    assert_eq!(website.domain, "a11ywatch.com");
    let website = feed.get_website(value1);
    let website: PageIssue = JsValue::into_serde(&website).unwrap();
    assert_eq!(website.domain, "jeffmendez.com");
}

#[wasm_bindgen_test]
fn get_website() {
    let mut feed = Feed::new();
    let value = JsValue::from_serde(&serde_json::json!({
        "pageUrl": "https://a11ywatch.com/login",
        "domain": "a11ywatch.com",
        "issues": []
    })).unwrap();
    feed.insert_website(value.clone());

    let website = feed.get_website(value);
    let website: PageIssue = JsValue::into_serde(&website).unwrap();

    
    assert_eq!(website.domain, "a11ywatch.com");
}