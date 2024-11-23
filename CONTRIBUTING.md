# CONTRIBUTING.md

## Steps to Push a New Version of the Chrome App to the Chrome Web Store

Follow these steps to release a new version of the Chrome app. Ensure you have the appropriate permissions to push changes to the repository and access the Chrome Web Store Developer Dashboard.

---

### 1. Increment the Version in `manifest.json`

- Open `manifest.json`, update the `"version"` field, and save the file.

---

### 2. Rebase Changes into the `master` Branch

- Rebase your branch onto `master` to ensure a clean commit history, then merge it into `master` and push the changes.

---

### 3. Tag the New Version in GitHub

- Create and push a Git tag for the new version using the following commands:
  ```bash
  git tag -a v<new-version> -m "Release version v<new-version>"
  git push origin v<new-version>
  ```
  Replace `<new-version>` with the version number (e.g., `v1.1.1`).

---

### 4. Create the Archive/ZIP File for the Version

- Download the repository as a ZIP file from the tag in the GitHub UI under the **Releases** section. Ensure the contents match the version being released.

---

### 5. Submit to the Chrome Web Store

- Log in to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard), upload the ZIP file, add release notes, and publish the update.

---

### Additional Notes

- Test the app locally by loading the unpacked extension in Chrome via `chrome://extensions`.
- Notify the team once the new version is live.
