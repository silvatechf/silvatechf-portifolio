# Open-Source Contribution Log

**Maintainer:** `silvatechf`  
**Last reviewed:** 2026-10-28

> This log distinguishes proposals in personal forks from contributions accepted by upstream maintainers. Statuses must be updated only when supported by repository evidence.

## Requests — Private security reporting guidance

- **Upstream project:** [psf/requests](https://github.com/psf/requests)
- **Personal fork:** [silvatechf/requests](https://github.com/silvatechf/requests)
- **Branch:** `docs/security-reporting-guidance`
- **Fork PR:** [silvatechf/requests#1](https://github.com/silvatechf/requests/pull/1)
- **Related upstream issue:** [psf/requests#7635](https://github.com/psf/requests/issues/7635)
- **Changed file:** `.github/CONTRIBUTING.md`
- **Status:** Open PR in the personal fork; upstream acceptance is not confirmed.

### Problem and change

The contribution guidelines needed a clearer warning not to report suspected security vulnerabilities in public issues, along with a direct link to the project's private reporting policy. The change adds this guidance and links to `.github/SECURITY.md`.

### Validation recorded

- Confirmed the relative link target exists on the contribution branch.
- Reviewed the diff; it is documentation-only.
- The fork PR states that automated tests were not run because no code or test files changed.
- This must not be described as merged into `psf/requests` or accepted upstream.

### Accurate portfolio summary

> Proposed a documentation improvement to the Requests contribution guidelines, making the private vulnerability disclosure process easier to find and helping reduce the risk of sensitive reports being posted publicly.

### Follow-up

Before opening an upstream PR, re-check the current upstream issue, contribution guidelines, and duplicate PRs. Record maintainer feedback and the final outcome accurately.

---

## Bandit — Disable progress bar in CI

- **Upstream project:** [PyCQA/bandit](https://github.com/PyCQA/bandit)
- **Personal fork:** [silvatechf/bandit](https://github.com/silvatechf/bandit)
- **Branch:** `fix/disable-progress-bar-in-ci`
- **Fork PR:** [silvatechf/bandit#1](https://github.com/silvatechf/bandit/pull/1)
- **Related upstream issue:** [Bandit issue #1476](https://github.com/PyCQA/bandit/issues/1476)
- **Changed files:** `bandit/core/manager.py`, `tests/unit/core/test_manager.py`
- **Status:** Open PR in the personal fork; validation incomplete; upstream acceptance is not confirmed.

### Problem and change

Bandit can display an interactive progress bar when scanning more than the configured progress threshold. This display is not useful in CI logs. The proposed change checks that the `CI` environment variable is not set before displaying the progress bar.

### Tests added

- `test_run_tests_disables_progress_in_ci`: expects `progress.track()` not to be called when `CI=true`.
- `test_run_tests_keeps_progress_outside_ci`: expects `progress.track()` to be called outside CI when the file-count and logging-level conditions are satisfied.

### Validation evidence and outstanding issues

Latest observed Build and Test run: [GitHub Actions run 40711462684](https://github.com/silvatechf/bandit/actions/runs/40711462684).

At the last inspection on 2026-10-28:
- Ubuntu test jobs for Python 3.10, 3.11, 3.12, 3.13 and 3.14 had completed successfully.
- macOS jobs were still queued.
- `format` failed because Black wanted to reformat the new test.
- `pep8` failed because a line in the new test had 81 characters, above the 79-character limit.
- `Dependency Review` failed because the fork's Dependency Graph was not enabled/supported for that workflow.
- The full workflow was not green at the last inspection.

The `format` and `pep8` failures share a formatting cause. The Dependency Review failure is a fork configuration issue and does not, by itself, show that the code change is defective.

### Accurate portfolio summary

> Proposed a CI usability improvement to Bandit and added unit tests for CI and non-CI behavior. The PR remains open, and the full CI matrix has not yet been verified green.

### Follow-up

1. Apply Black/Flake8-compatible formatting.
2. Push the correction and inspect the resulting workflow run.
3. Verify that all relevant OS/Python jobs finish.
4. Decide whether to enable Dependency Graph on the fork or document this check as a fork configuration limitation.
5. Do not claim upstream acceptance or complete validation without evidence.

---

## Wording rules for LinkedIn and CV

- **Accurate before acceptance:** “proposed,” “worked on,” “opened a pull request,” “added unit tests,” “investigated CI failures.”
- **Use only after confirmation:** “CI passed,” “merged,” “accepted by maintainers,” “contributed to the upstream project.”
- Never present a fork-only change as an accepted upstream contribution.
- Link directly to the PR and state its current status.
- Tie technical claims to commits, diffs, test results, and workflow runs.
