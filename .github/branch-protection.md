# GitHub Branch Protection Configuration

To protect the `main` branch and enforce proper development workflow, apply these settings in your GitHub repository:

## Branch Protection Rules for `main`

Navigate to: **Settings** → **Branches** → **Add rule**

### Basic Settings
- **Branch name pattern**: `main`
- ✅ **Restrict pushes that create files larger than 100 MB**

### Protect matching branches
- ✅ **Require a pull request before merging**
  - ✅ **Require approvals**: 1
  - ✅ **Dismiss stale reviews when new commits are pushed**
  - ✅ **Require review from code owners**
  - ✅ **Restrict reviews to users with write access**

### Status Checks
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- **Required status checks**:
  - `test (18.x)`
  - `test (20.x)`
  - `test (22.x)`
  - `security`

### Additional Restrictions
- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits**
- ✅ **Require linear history**
- ✅ **Include administrators** (applies rules to admins too)
- ✅ **Allow force pushes**: Never
- ✅ **Allow deletions**: Never

## Branch Protection Rules for `develop` (optional)

If using a develop branch:

### Basic Settings
- **Branch name pattern**: `develop`

### Protect matching branches
- ✅ **Require a pull request before merging**
  - **Require approvals**: 1
  - ✅ **Require review from code owners**

### Status Checks
- ✅ **Require status checks to pass before merging**
- **Required status checks**:
  - `test (20.x)`
  - `security`

## Repository Settings

### General Settings
- ✅ **Allow merge commits**: Disabled
- ✅ **Allow squash merging**: Enabled (default)
- ✅ **Allow rebase merging**: Enabled
- ✅ **Always suggest updating pull request branches**
- ✅ **Automatically delete head branches**

### Security Settings
- ✅ **Enable vulnerability alerts**
- ✅ **Enable dependency graph**
- ✅ **Enable Dependabot alerts**
- ✅ **Enable Dependabot security updates**

## Result

After applying these settings:

1. **Direct commits to `main` are forbidden**
2. **All changes must go through Pull Requests**
3. **PRs require approval and passing CI**
4. **Linear history is maintained**
5. **Security checks are enforced**

This ensures code quality and prevents unauthorized changes to the main branch.