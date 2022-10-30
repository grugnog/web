extern crate serde;
extern crate a11ywatch_web_wasm;
extern crate serde_wasm_bindgen;

use wasm_bindgen_test::*;
use a11ywatch_web_wasm::structures::website::{PageIssue};
use a11ywatch_web_wasm::Feed;

#[wasm_bindgen_test]
fn insert_website() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None
    };
    let value = serde_wasm_bindgen::to_value(&web).unwrap();

    let web1: PageIssue = PageIssue {
        page_url: "https://jeffmendez.com".to_string(),
        domain: "jeffmendez.com".to_string(),
        issues: None
    };
    let value1 = serde_wasm_bindgen::to_value(&web1).unwrap();

    feed.insert_website(value.clone());
    feed.insert_website(value1.clone());

    let website = feed.get_website(value);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();
    assert_eq!(website.domain, "a11ywatch.com");
    let website = feed.get_website(value1);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();
    assert_eq!(website.domain, "jeffmendez.com");
}

#[wasm_bindgen_test]
fn get_website() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None
    };

    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    
    feed.insert_website(value.clone());

    let website = feed.get_website(value);
    let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website.domain, "a11ywatch.com");
}

#[wasm_bindgen_test]
fn get_website_item() {
    let mut feed = Feed::new();
    let web: PageIssue = PageIssue {
        page_url: "https://a11ywatch.com/login".to_string(),
        domain: "a11ywatch.com".to_string(),
        issues: None
    };

    let value = serde_wasm_bindgen::to_value(&web).unwrap();
    feed.insert_website(value.clone());

    let website = feed.get_data_item("a11ywatch.com".to_string(), false);
    let website: Vec<PageIssue> = serde_wasm_bindgen::from_value(website).unwrap();

    assert_eq!(website.is_empty(), false);
}