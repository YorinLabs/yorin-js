'use client';

import { useState } from 'react';

export default function ServerDemo() {
  const [userId, setUserId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const trackServerEvent = async (type: string, eventName: string, properties?: any, paymentProperties?: any, subscriptionProperties?: any, groupId?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          eventName,
          userId,
          properties,
          paymentProperties,
          subscriptionProperties,
          groupId,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Network error', details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Yorin Node.js SDK Server Demo
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID (for server events)
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter user ID"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Server Events</h2>

              <button
                onClick={() => trackServerEvent('track', 'server_purchase', {
                  amount: 99.99,
                  currency: 'USD',
                  product_id: 'prod_123'
                })}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Track Purchase Event
              </button>

              <button
                onClick={() => trackServerEvent('identify', 'identify', {
                  $email: 'user@example.com',
                  $full_name: 'John Doe',
                  $company: 'Acme Corp',
                  subscription_tier: 'premium'
                })}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Identify User
              </button>

              <button
                onClick={() => trackServerEvent('group', 'group', {
                  group_id: 'org_456',
                  $name: 'Acme Corporation',
                  $industry: 'Technology',
                  employees: 500
                })}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                Group Event
              </button>

              <button
                onClick={() => trackServerEvent('track', 'feature_used', {
                  feature_name: 'advanced_analytics',
                  usage_count: 1
                })}
                disabled={loading}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50"
              >
                Track Feature Usage
              </button>

              <button
                onClick={() => trackServerEvent('page', 'Server Demo Page', {
                  section: 'demo',
                  page_type: 'example'
                })}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                Track Page View
              </button>

              <button
                onClick={() => trackServerEvent('payment', '', undefined, {
                  payment_id: 'pay_' + Math.random().toString(36).substr(2, 9),
                  amount: 29.99,
                  currency: 'USD',
                  payment_method: 'credit_card',
                  payment_status: 'completed',
                  product_id: 'prod_premium_plan',
                  subscription_id: 'sub_monthly'
                })}
                disabled={loading}
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 disabled:opacity-50"
              >
                💳 Track Payment
              </button>

              <button
                onClick={() => trackServerEvent('payment', '', undefined, {
                  payment_id: 'pay_stripe_' + Math.random().toString(36).substr(2, 9),
                  amount: 99.99,
                  currency: 'USD',
                  payment_method: 'stripe',
                  payment_status: 'completed',
                  stripe_session_id: 'cs_test_' + Math.random().toString(36).substr(2, 15),
                  product_id: 'prod_annual_plan',
                  invoice_id: 'inv_' + Math.random().toString(36).substr(2, 9)
                })}
                disabled={loading}
                className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 disabled:opacity-50"
              >
                💎 Stripe Payment
              </button>

              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Contact & Group Management</h3>

                <button
                  onClick={() => trackServerEvent('identify', 'identify', {
                    $email: 'sarah.jones@acmecorp.com',
                    $full_name: 'Sarah Jones',
                    $first_name: 'Sarah',
                    $last_name: 'Jones',
                    $company: 'Acme Corp',
                    $job_title: 'VP Engineering',
                    $phone: '+1-555-0199',
                    department: 'Engineering',
                    seniority: 'senior',
                    skills: 'React, Node.js, PostgreSQL'
                  })}
                  disabled={loading}
                  className="w-full mb-2 bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 disabled:opacity-50"
                >
                  👤 Identify Advanced User
                </button>

                <button
                  onClick={() => trackServerEvent('group', 'group', {
                    group_id: 'org_acme_corp',
                    $name: 'Acme Corporation',
                    $industry: 'SaaS Technology',
                    $size: '1200',
                    $website: 'https://acmecorp.com',
                    $email: 'info@acmecorp.com',
                    $phone: '+1-800-ACME-123',
                    plan_type: 'enterprise',
                    contract_value: 120000,
                    renewal_date: '2024-12-31',
                    support_tier: 'premium'
                  })}
                  disabled={loading}
                  className="w-full mb-2 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:opacity-50"
                >
                  🏢 Create Group (Acme Corp)
                </button>

                <button
                  onClick={() => trackServerEvent('group', 'group', {
                    group_id: 'org_acme_corp',
                    $name: 'Acme Corporation',
                    $user_id: userId, // This connects the user to the group
                    plan_upgrade: 'enterprise_plus',
                    seats_added: 50,
                    upgrade_date: new Date().toISOString()
                  })}
                  disabled={loading}
                  className="w-full mb-2 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:opacity-50"
                >
                  🔗 Connect User to Group
                </button>

                <button
                  onClick={() => trackServerEvent('identify', 'identify', {
                    $email: 'mike.wilson@acmecorp.com',
                    $full_name: 'Mike Wilson',
                    $company: 'Acme Corp',
                    $job_title: 'Product Manager',
                    team: 'Product',
                    location: 'San Francisco',
                    start_date: '2023-06-15'
                  })}
                  disabled={loading}
                  className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 disabled:opacity-50"
                >
                  👥 Add Another Team Member
                </button>
              </div>

              <div className="border-t border-gray-300 pt-4 mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Subscription Management</h3>

                <button
                  onClick={() => trackServerEvent('subscription', '', undefined, undefined, {
                    external_subscription_id: 'sub_stripe_' + Math.random().toString(36).substr(2, 9),
                    plan_id: 'plan_premium_monthly',
                    plan_name: 'Premium Monthly',
                    status: 'active',
                    subscriber_type: 'contact',
                    amount: 29.99,
                    currency: 'USD',
                    billing_cycle: 'monthly',
                    started_at: new Date().toISOString(),
                    current_period_start: new Date().toISOString(),
                    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    provider: 'stripe',
                    features: ['priority_support', 'advanced_analytics']
                  })}
                  disabled={loading}
                  className="w-full mb-2 bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 disabled:opacity-50"
                >
                  💎 Contact Subscription (Premium)
                </button>

                <button
                  onClick={() => trackServerEvent('subscription', '', undefined, undefined, {
                    external_subscription_id: 'sub_enterprise_' + Math.random().toString(36).substr(2, 9),
                    plan_id: 'plan_enterprise_yearly',
                    plan_name: 'Enterprise Annual',
                    status: 'active',
                    subscriber_type: 'group',
                    amount: 1200.00,
                    currency: 'USD',
                    billing_cycle: 'yearly',
                    started_at: '2024-01-01T00:00:00Z',
                    current_period_start: '2024-01-01T00:00:00Z',
                    current_period_end: '2024-12-31T23:59:59Z',
                    provider: 'stripe',
                    seats: 100,
                    enterprise_features: ['sso', 'custom_integrations', 'dedicated_support']
                  }, 'org_acme_corp')}
                  disabled={loading}
                  className="w-full mb-2 bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 disabled:opacity-50"
                >
                  🏢 Group Subscription (Enterprise)
                </button>

                <button
                  onClick={() => trackServerEvent('subscription', '', undefined, undefined, {
                    external_subscription_id: 'sub_trial_' + Math.random().toString(36).substr(2, 9),
                    plan_id: 'plan_pro_trial',
                    plan_name: 'Pro Trial',
                    status: 'trialing',
                    subscriber_type: 'contact',
                    amount: 0,
                    currency: 'USD',
                    billing_cycle: 'monthly',
                    started_at: new Date().toISOString(),
                    trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                    provider: 'stripe',
                    trial_days: 14
                  })}
                  disabled={loading}
                  className="w-full mb-2 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50"
                >
                  🆓 Trial Subscription
                </button>

                <button
                  onClick={() => trackServerEvent('subscription', '', undefined, undefined, {
                    external_subscription_id: 'sub_cancelled_' + Math.random().toString(36).substr(2, 9),
                    plan_id: 'plan_basic_monthly',
                    plan_name: 'Basic Monthly',
                    status: 'cancelled',
                    subscriber_type: 'contact',
                    amount: 9.99,
                    currency: 'USD',
                    billing_cycle: 'monthly',
                    started_at: '2024-01-01T00:00:00Z',
                    cancelled_at: new Date().toISOString(),
                    provider: 'stripe',
                    cancellation_reason: 'user_requested',
                    refund_amount: 0
                  })}
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  ❌ Cancel Subscription
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Response</h2>
              <div className="bg-gray-100 p-4 rounded-md min-h-96">
                {loading && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Sending event...</span>
                  </div>
                )}
                {response && !loading && (
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}
                {!response && !loading && (
                  <p className="text-gray-500 italic">Click any button to see the server response</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• These events are sent to <code>/api/track</code> route</li>
              <li>• The API route uses the <strong>yorin-nodejs</strong> SDK with secret key authentication</li>
              <li>• Server events require either <code>user_id</code> or <code>group_id</code></li>
              <li>• Events are sent with <code>Authorization: Bearer sk_*</code> header</li>
              <li>• No domain validation required for server events</li>
              <li>• <strong>Payment events</strong> are stored with dedicated fields in ClickHouse</li>
              <li>• <strong>Identify/Group events</strong> create/update records in PostgreSQL with automatic upserts</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
            <h3 className="font-semibold text-green-900 mb-2">PostgreSQL Integration:</h3>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• <strong>identify</strong> events → <code>contacts</code> table (conflict resolution by user_id or email)</li>
              <li>• <strong>group</strong> events → <code>groups</code> table (conflict resolution by group_id)</li>
              <li>• Automatic upserts: if user/group exists, it updates the record with new properties</li>
              <li>• Anonymous user mapping: links browser sessions to identified users</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
            <h3 className="font-semibold text-amber-900 mb-2">Contact-Group Relationships:</h3>
            <ul className="text-amber-800 text-sm space-y-1">
              <li>• <strong>Step 1:</strong> Create contact with <code>identify</code> event</li>
              <li>• <strong>Step 2:</strong> Create group with <code>group</code> event (includes group_id)</li>
              <li>• <strong>Step 3:</strong> Connect them with <code>group</code> event + <code>user_id</code></li>
              <li>• <strong>Result:</strong> Creates relationship in <code>contact_groups</code> table</li>
              <li>• Multiple users can belong to the same group (team/organization)</li>
            </ul>
            <div className="mt-2 p-2 bg-amber-100 rounded text-xs">
              <strong>Pro Tip:</strong> The order matters! Both contact and group must exist before creating the relationship.
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mt-4">
            <h3 className="font-semibold text-purple-900 mb-2">Subscription Tracking (NEW!):</h3>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• <strong>Polymorphic Design:</strong> <code>subscriptions</code> table with <code>subscriber_type</code> (contact/group)</li>
              <li>• <strong>Contact Subscriptions:</strong> Individual user plans (Premium, Pro, Basic)</li>
              <li>• <strong>Group Subscriptions:</strong> Organization-wide plans (Enterprise, Team)</li>
              <li>• <strong>Status Tracking:</strong> active, cancelled, past_due, trialing, paused</li>
              <li>• <strong>Billing Cycles:</strong> monthly, yearly, quarterly, weekly</li>
              <li>• <strong>Provider Support:</strong> Stripe, Paddle, manual billing</li>
            </ul>
            <div className="mt-2 p-2 bg-purple-100 rounded text-xs">
              <strong>Schema:</strong> subscriber_type + subscriber_id allows subscriptions to belong to either contacts OR groups flexibly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}